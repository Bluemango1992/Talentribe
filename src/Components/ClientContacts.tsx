import { useState } from 'react';
import { Paper, Modal, Input, EmptyState, Breadcrumbs, HeaderCard } from '../Components';
import { H6, P2, H4 } from '../Typography';
import { useParams } from 'react-router-dom';
    
const ClientContacts = ({ data }: { data: any[] }) => {

        const [isModalOpen, setIsModalOpen] = useState(false);

        return (
            <Paper>
                    <HeaderCard heading='Client Contacts' showIcon={true} />
                <ul className="flex flex-row flex-wrap gap-8 p-4">
                    {data && data.length === 0 && <EmptyState message="No clients found." />}
                    {data && data.map((item) => (
                        <li key={item.clientID} className="flex min-w-[200px] flex-col gap-1">
                           <H6>{item.clientName}</H6> 
                            <P2>{item.contactEmail}</P2>
                            <div className="flex flex-row gap-2">
                            <P2>{item.phoneNumber}</P2>
                            </div>
                            <Breadcrumbs items={[item.industryCategory, item.location]} />
                        </li>
                    ))}
                </ul>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ClientForm setIsModalOpen={setIsModalOpen} />
                </Modal>          
            </Paper>
        )

    }

    export default ClientContacts;


    const ClientForm = ({ setIsModalOpen }: { setIsModalOpen: (isOpen: boolean) => void }) => {

        const [formData, setFormData] = useState({
            clientName: '',
            contactEmail: '',
            phoneNumber: '',
            industryCategory: '',
            location: '',
        });
    
        const [formSubmitted, setFormSubmitted] = useState(false);
        const [error, setError] = useState('');
    
        const { organisationID } = useParams();
    
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData(prevState => ({ ...prevState, [name]: value }));
        };
    
        const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setFormSubmitted(true);
    
            if (formData.clientName && formData.contactEmail && formData.phoneNumber && formData.industryCategory && formData.location) {
    
                fetch('http://localhost:3001/clients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clientName: formData.clientName,
                        contactEmail: formData.contactEmail,
                        phoneNumber: formData.phoneNumber,
                        industryCategory: formData.industryCategory,
                        location: formData.location,
                        organisationID: organisationID,
                    }),
                })
                .then((response) => {
                    response.json();
                    setIsModalOpen(false);
                })
                .catch((error) => {
                    console.error("Error adding client: ", error);
                });
    
            } else {
                setError('Please fill in all fields');
            }
        };
               


            return (
            <div className="flex flex-col gap-4 min-w-[400px] max-w-[500px]">
                <H4>Add a new client</H4>
                <div className="flex flex-col gap-2">
                <Input
                label="Client Name"
                type="text"
                errorMessage={formSubmitted && !formData.clientName ? 'Please fill in field' : undefined}
                placeholder="Joe Bloggs"
                onChange={handleInputChange}
                value={formData.clientName}
                name="clientName"
                />
                <Input
                label="Contact Email"
                type="email"
                errorMessage={formSubmitted && !formData.contactEmail ? 'Please fill in field' : undefined}
                placeholder="email@email.co.uk"
                onChange={handleInputChange}
                value={formData.contactEmail}
                name="contactEmail"
                />
                <Input
                label="Phone Number"
                type="tel"
                errorMessage={formSubmitted && !formData.phoneNumber ? 'Please fill in field' : undefined}
                placeholder="Phone Number"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                name="phoneNumber"
                />
                <Input
                label="Industry Category"
                type="text"
                errorMessage={formSubmitted && !formData.industryCategory ? 'Please fill in field' : undefined}
                placeholder="Industry Category"
                onChange={handleInputChange}
                value={formData.industryCategory}
                name="industryCategory"
                />
                <Input
                label="Location"
                type="text"
                errorMessage={formSubmitted && !formData.location ? 'Please fill in field' : undefined}
                placeholder="Location"
                onChange={handleInputChange}
                value={formData.location}
                name="location"
                />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button className="bg-slate-800 hover:bg-slate-900 text-white rounded-md py-2" onClick={handleSubmit}>Submit</button>
            </div>
            );
        };
