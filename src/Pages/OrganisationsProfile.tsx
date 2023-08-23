import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout, Template } from "."
import { Paper, Breadcrumbs, Button, Chip, FAB, Modal, Input, SelectField, EmptyState, ClientContacts, ActivityCard, Notes, HeaderCard } from "../Components"
import { H3, H4, Caption, P2, H5, H6, P, H2 } from "../Typography"
import { FaInternetExplorer, FaPhone, FaVoicemail } from "react-icons/fa"

const OrganisationsProfile = () => {

    const [organisationData, setOrganisationData] = useState<any[]>([]);
    const [jobsData, setJobsData] = useState<any[]>([]);
    const [clientsData, setClientsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    const { organisationID } = useParams<{ organisationID: string }>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Fetch organisations
            const orgResponse = await fetch('http://localhost:3001/organisations');
            const orgData = await orgResponse.json();
            const filteredOrganisations = orgData.filter((organisation: any) => organisation.organisationID === Number(organisationID));
            setOrganisationData(filteredOrganisations);
    
            // Fetch jobs
            const jobsResponse = await fetch('http://localhost:3001/jobs');
            const jobsData = await jobsResponse.json();
            const filteredJobs = jobsData.filter((job: any) => job.organisationID === Number(organisationID));
            setJobsData(filteredJobs);

            // Fetch clients
            const clientsResponse = await fetch('http://localhost:3001/clients');
            const clientsData = await clientsResponse.json();
            const filteredClients = clientsData.filter((client: any) => client.organisationID === Number(organisationID));
            setClientsData(filteredClients);
        
            setLoading(false);
        }
        fetchData();
    }, [organisationID]);   
    

    return (
        <Layout>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                <Template top={<OrganistionsCard data={organisationData[0]} />} left={<ActivityCard />} middle={<JobsCard data={jobsData} />} right={<><ClientContacts data={clientsData} /> <Notes /></>} />
                </>
            )}
        </Layout>
    );
}
    

export default OrganisationsProfile


type OrganisationsCardProps = {
    data: {
        organisationID: number;
        companyName: string;
        industry: string;
        location: string;
        website: string;
    }
}

const OrganistionsCard = ({data} : OrganisationsCardProps) => {

    const [locationsData, setLocationsData] = useState<any[]>([]);

    const { organisationID } = useParams<{ organisationID: string }>();
    
    useEffect(() => {
        const fetchData = async () => {
            // Fetch locations
            const locationsResponse = await fetch('http://localhost:3001/locations');
            const locationsData = await locationsResponse.json();
            const filteredLocations = locationsData.filter((location: any) => location.organisationID === Number(organisationID));
            setLocationsData(filteredLocations);
        }
        fetchData();
    }, [organisationID]);


    if (!data || !data.companyName || !data.industry || !data.location || !data.website) {
        return <div>No Data Found</div>;
    }

    return (
        <Paper>
            <div className="flex p-8 items-center justify-between">
                    <div className="flex flex-col gap-1">
                    <H2>{data.companyName}</H2>
                    <Breadcrumbs items={[data.industry, data.location]} />
                    <Hyperlink href={data.website}>
                        {data.
                        website}
                    </Hyperlink>
                </div>

                    <LocationCard data={locationsData} />
                
                <div className="flex flex-row gap-2">   
                    <FAB icon={<FaPhone />} />
                    <FAB icon={<FaVoicemail />} />
                    <FAB icon={<FaInternetExplorer />} />
                </div>
                </div>
        </Paper>
    )
}

type HyperlinkProps = {
    children: React.ReactNode;
    href: string;
    };


const Hyperlink = ({children, href}: HyperlinkProps) => {
    
        return(
            <a className="text-blue-500 hover:text-blue-700" href={href}>{children}</a>
        )
    }

type JobsCardProps = {
    data: {
        jobID: number;
        organisationID: number;
        title: string;
        jobType: string;
        location: string;
        salaryRange: string;
        shortlist: number;
        CVsent: number;
        interview: number;
        offer: number;
        rejected: number;
    }[]
}

const JobsCard = ({data} : JobsCardProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

        return (    
            <Paper>
              
               
                <HeaderCard heading="Jobs" subHeading={`${data.length} results`} showIcon={true} onClick={() => {setIsModalOpen(true)}} />
                {data.length === 0 && <EmptyState message="No jobs found." />}
                {data.map((item) => {
                    return(
                        <div key={item.jobID} className="flex flex-col mb-4 border-b border-slate-100 p-4 gap-1">
                        <div className="flex flex-row justify-between">
                        <H5>{item.title}</H5>
                        <Chip>{item.jobType}</Chip>
                        </div>
                        <div className="flex flex-col justify-between gap-1 m-1">
                        <P2>{item.location}</P2>
                        <Caption>{item.salaryRange}</Caption>
                        </div>
                        
                        <div className="flex flex-1 gap-1">
                        <KPI title="Shortlist">{item.shortlist}</KPI>
                        <KPI title="CV sent">{item.CVsent}</KPI>
                        <KPI title="Interview">{item.interview}</KPI>
                        <KPI title="Offer">{item.offer}</KPI>
                        </div>
                        </div>                   )
                }
                )}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <JobForm setIsModalOpen={setIsModalOpen} />
                </Modal>
            </Paper>
        )
    }

    const JobForm = ({ setIsModalOpen }: { setIsModalOpen: (isOpen: boolean) => void }) => {
        const [formData, setFormData] = useState({
            title: '',
            jobType: '',
            location: '',
            minSalary: '',
            maxSalary: '',
            currencyType: '',
        });

        const [formSubmitted, setFormSubmitted] = useState(false);

        const { organisationID } = useParams();

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData(prevState => ({ ...prevState, [name]: value }));
        };

        const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setFormSubmitted(true);

            if (formData.title && formData.jobType && formData.location && formData.minSalary && formData.maxSalary && formData.currencyType) {
                fetch('http://localhost:3001/jobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        jobType: formData.jobType,
                        location: formData.location,
                        minSalary: formData.minSalary,
                        maxSalary: formData.maxSalary,
                        currencyType: formData.currencyType,
                        organisationID: organisationID,
                    }),
                })
                .then((response) => {
                    response.json();
                    setIsModalOpen(false);
                })
                .catch((error) => {
                    console.error("Error adding job: ", error);
                });
            }
        };


        const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Temporary", "Internship"];

        const CURRENCY_TYPES = ["USD", "EUR", "GBP", "INR", "JPY"];


        return (
            <div className="flex flex-col gap-4 min-w-[400px] max-w-[500px]">
                <H4>Add a new job</H4>
                <div className="flex flex-col gap-2">
                    <Input 
                        label="Job Title"
                        type="text"
                        errorMessage={formSubmitted && !formData.title ? 'Please fill in field' : undefined}
                        placeholder="Accountant, Software Developer, etc."
                        onChange={handleInputChange}
                        value={formData.title}
                        name="title"
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
                    <SelectField
                        label="Job Type"
                        onSelect={(option: string) => setFormData(prevState => ({ ...prevState, jobType: option }))}
                        options={JOB_TYPES}
                        placeholder="Select Job Type"
                    />
                    <div className="flex flex-row gap-2 justify-between">
                    <SelectField
                            label="Currency"
                            onSelect={(value: string) => setFormData(prevState => ({ ...prevState, currencyType: value }))}
                            options={CURRENCY_TYPES}
                            placeholder="GBP"
                        />
                      <Input 
                        label="Minimum Salary"
                        type="number"
                        errorMessage={formSubmitted && !formData.minSalary ? 'Please fill in field' : undefined}
                        placeholder="Enter Min Salary"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prevState => ({ ...prevState, minSalary: e.target.value }))}
                        value={formData.minSalary}
                        name="minSalary"
                    />

                    <Input 
                        label="Maximum Salary"
                        type="number"
                        errorMessage={formSubmitted && !formData.maxSalary ? 'Please fill in field' : undefined}
                        placeholder="Enter Max Salary"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prevState => ({ ...prevState, maxSalary: e.target.value }))}
                        value={formData.maxSalary}
                        name="maxSalary"
                    />
                    </div>
                    </div>
                    <Button variant="primary" onClick={handleSubmit}>Add Job</Button>
                </div>

        );

    }
    

    type KPIProps = {
        children: React.ReactNode;
        title: string;
        };

    const KPI = ({children, title='title'}: KPIProps) => {

        return(
            <div className="flex flex-col items-center justify-center w-full h-12 bg-slate-100">
            <Caption>{title}</Caption>
            <div className="text-slate-500 text-lg font-bold">{children}</div>
            </div>
        )
    }

    type Location = {
        data: {
            locationID: number;
            organisationID: number;
            officeType: string;
            address: string;
            city: string;
            country: string;
            postalCode: string;
        }[];
    }
    
    const LocationCard = ({ data }: Location) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        return (
                <div className="flex flex-col min-w-[600px]">
                    <div className="flex justify-end">
                        <Button variant="tertiary" size="small" onClick={() => setIsModalOpen(true)}>Add Location</Button>
                    </div>
                    <ul className="flex flex-col w-full">
                        {data.map((item) => (
                            <li key={item.locationID}>
                                <H6>{item.officeType}</H6>
                                <P2>{item.address}</P2>
                                <div className="flex flex-row gap-2">
                                    <P2>{item.city}, {item.country}</P2>
                                </div>
                                <P2>{item.postalCode}</P2>
                            </li>
                        ))}
                    </ul>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <LocationForm setIsModalOpen={setIsModalOpen} />
                    </Modal>
                </div>
        )
    }
    
    const LocationForm = ({ setIsModalOpen }: { setIsModalOpen: (isOpen: boolean) => void }) => {
        const [formData, setFormData] = useState({
            officeType: '',
            address: '',
            city: '',
            country: '',
            postalCode: '',
        });
    
        const [formSubmitted, setFormSubmitted] = useState(false);
        const [error] = useState('');
    
        const { organisationID } = useParams();
    
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData(prevState => ({ ...prevState, [name]: value }));
        };
    
        const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setFormSubmitted(true);
    
            if (formData.officeType && formData.address && formData.city && formData.country && formData.postalCode) {
                fetch('http://localhost:3001/locations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        officeType: formData.officeType,
                        address: formData.address,
                        city: formData.city,
                        country: formData.country,
                        postalCode: formData.postalCode,
                        organisationID: organisationID,
                    }),
                })
                .then((response) => {
                    response.json();
                    setIsModalOpen(false);
                })
                .catch((error) => {
                    console.error("Error adding location: ", error);
                });
            } 
        };
    
        return (
            <div className="flex flex-col gap-4 min-w-[400px] max-w-[500px]">
                <H4>Add a new location</H4>
                <div className="flex flex-col gap-2">
                    <Input
                        label="Office Type"
                        type="text"
                        errorMessage={formSubmitted && !formData.officeType ? 'Please fill in field' : undefined}
                        placeholder="Office Type"
                        onChange={handleInputChange}
                        value={formData.officeType}
                        name="officeType"
                    />
                    <Input
                        label="Address"
                        type="text"
                        errorMessage={formSubmitted && !formData.address ? 'Please fill in field' : undefined}
                        placeholder="Address"
                        onChange={handleInputChange}
                        value={formData.address}
                        name="address"
                    />
                    <Input
                        label="City"
                        type="text"
                        errorMessage={formSubmitted && !formData.city ? 'Please fill in field' : undefined}
                        placeholder="City"
                        onChange={handleInputChange}
                        value={formData.city}
                        name="city"
                    />
                    <Input
                        label="Country"
                        type="text"
                        errorMessage={formSubmitted && !formData.country ? 'Please fill in field' : undefined}
                        placeholder="Country"
                        onChange={handleInputChange}
                        value={formData.country}
                        name="country"
                    />
                    <Input
                        label="Postal Code"
                        type="text"
                        errorMessage={formSubmitted && !formData.postalCode ? 'Please fill in field' : undefined}
                        placeholder="Postal Code"
                        onChange={handleInputChange}
                        value={formData.postalCode}
                        name="postalCode"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button className="bg-slate-800 hover:bg-slate-900 text-white rounded-md py-2" onClick={handleSubmit}>Submit</button>

            </div>
        );
    }
    
    interface Note {
        text: string;
        organisationID: string;
        created_at: string;
        id: string;  // Assuming each note also has an 'id' based on your delete func    

    }



