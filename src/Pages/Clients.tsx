
import { Table, SelectField, Button, Modal, Input } from '../Components';
import { Layout } from '.';
import { useEffect, useState } from 'react';
import { H2, H4 } from '../Typography';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Clients {
  clientName: string;
  companyName: string;
  contactEmail: string;
  phoneNumber: string;
  industryCategory: string;
  location: string;
}

const Clients = () => {

  const [clientData, setClientData] = useState<Clients[]>([]);
  const [companyFilter, setCompanyFilter] = useState<string | null>(null);
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/clients').then(res => res.json()),
      fetch('http://localhost:3001/organisations').then(res => res.json())
    ])
    .then(([clients, organisations]) => {
      const updatedClients = clients.map(client => {
        const organisation = organisations.find(org => org.organisationID === client.organisationID);
        return {
          ...client,
          companyName: organisation?.companyName || 'Unknown'
        };
      });
      setClientData(updatedClients);
    });
    
  }, []);

  const handleCompanySelect = (option: string) => {
    setCompanyFilter(option === "All" ? null : option);
  };

  const handleIndustrySelect = (option: string) => {
    setIndustryFilter(option === "All" ? null : option);
  };

  const handleLocationSelect = (option: string) => {
    setLocationFilter(option === "All" ? null : option);
  };

  const filteredData = clientData
  .filter(client => !companyFilter || client.companyName.includes(companyFilter))
  .filter(client => !industryFilter || client.industryCategory === industryFilter)
  .filter(client => !locationFilter || client.location.startsWith(locationFilter));

  const [ showModal, setShowModal ] = useState(false);

  const handleAddClient = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRowClick = (row: any) => {
    navigate(`/clients/${row.clientID}`);
  };

  return (
    <Layout>
      <div className="flex justify-between mb-2">
        <H2>Clients</H2>
        <Button onClick={handleAddClient} variant='secondary' size='medium'>Add Client</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4 w-1/3">
        <SelectField type='text' placeholder='Company' options={['All', ...new Set(clientData.map(client => client.companyName))]} onSelect={handleCompanySelect} />
        <SelectField type='text' placeholder='Industry' options={['All', ...new Set(clientData.map(client => client.industryCategory))]} onSelect={handleIndustrySelect} />
        <SelectField type='text' placeholder='Location' options={['All', ...new Set(clientData.map(client => client.location))]} onSelect={handleLocationSelect} />
      </div>
      {filteredData.length === 0 ? (
        <div className="text-center h-full">No clients found.</div>
      ) : (
        <Table
          data={filteredData}
          headers={['Name', 'Company', 'Email', 'Phone', 'Industry', 'Location']}
          keys={['clientName', 'companyName', 'contactEmail', 'phoneNumber', 'industryCategory', 'location']}
          onRowClick={handleRowClick}
        />
      )}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ClientForm setIsModalOpen={setShowModal} />
        </Modal>
    </Layout>
  );
}

export default Clients;


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
