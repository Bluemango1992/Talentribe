import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "."
import { Paper, Breadcrumbs, Button, Chip, FAB } from '../Components'
import { H3, H4, Caption, P2, H5, H6, P } from "../Typography"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaInternetExplorer, FaPhone, FaTrash, FaVoicemail } from "react-icons/fa"

const OrganisationsProfile = () => {

    const [organisationData, setOrganisationData] = useState<any[]>([]);
    const [jobsData, setJobsData] = useState<any[]>([]);
    const [locationsData, setLocationsData] = useState<any[]>([]);
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
    
            // Fetch locations
            const locationsResponse = await fetch('http://localhost:3001/locations');
            const locationsData = await locationsResponse.json();
            const filteredLocations = locationsData.filter((location: any) => location.organisationID === Number(organisationID));
            setLocationsData(filteredLocations);
    
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
                // This is your actual content that will be displayed once the data has loaded
                <>
                    <div className="flex flex-col mb-4 ju">
                        {organisationData.length === 0 ? <p>No data found</p> : <OrganistionsCard data={organisationData[0]} />}
                        <HistoryCard />
                    </div>
                    <div className="flex gap-3">
                    <LocationCard data={locationsData} />
                        <div className="flex flex-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <JobsCard data={jobsData} />
                        </div>
                        <div className="flex flex-col gap-4 flex-1">
                             <ClientContacts data={clientsData} />
                            <Notes />
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
}
    

export default OrganisationsProfile

const OrganistionsCard = ({data}) => {

    if (!data || !data.companyName || !data.industry || !data.location || !data.website) {
        return <div>No Data Found</div>;
    }

    return (
        <Paper>
            <div className="flex flex-1 gap-4 p-8 items-start justify-between">
                    <div className="flex flex-col gap-1">
                    <H4>{data.companyName}</H4>
                    <Breadcrumbs items={[data.industry, data.location]} />
                    <Hyperlink href={data.website}>
                        {data.
                        website}
                    </Hyperlink>
                </div>
                <div className="flex flex-row gap-2">   
                    <FAB icon={<FaPhone />} />
                    <FAB icon={<FaVoicemail />} />
                    <FAB icon={<FaInternetExplorer />} />
                </div>
                </div>
        </Paper>
    )
}




const HistoryCard = () => {
    
    const data = [
        {
            activityID : 1,
            userID : "John Doe",
            action : "Shortlist confirmed",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 2,
            userID : "John Doe",
            action : "Note Added",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 3,
            userID : "John Doe",
            action : "Cv Sent",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 4,
            userID : "Jane Smith",
            action : "Interview confirmed",
            date : "2023-08-15 21:10:41"
        },
        {
            activityID : 5,
            userID : "John Doe",
            action : "Offer confirmed",
            date : "2023-08-15 21:10:41"
        }
    ]

    const ITEMS_PER_SECTION = 4;

    const [currentIndex, setCurrentIndex] = useState(0);  // Initial index

    const handleNext = () => {
        if (currentIndex + ITEMS_PER_SECTION < data.length) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <Paper>
            <div className="flex flex-row items-center p-4 gap-4">
            <Button variant="tertiary" size="small" onClick={handlePrevious} disabled={currentIndex === 0}><FaArrowAltCircleLeft size={24}/></Button>
                <div className="flex flex-row items-center justify-between w-full">
                {data.slice(currentIndex, currentIndex + ITEMS_PER_SECTION).map((activity, index) => (
                    <div key={activity.activityID} className="flex items-center gap-4 rounded-full w-full">
                        <div className="w-8 h-8 flex justify-center items-center rounded-md bg-slate-100">{currentIndex + index + 1}</div>
                        <div className="flex flex-col min-w-max">
                            <H6>{activity.userID}</H6>
                            <P2>{activity.action}</P2>
                            <Caption>{activity.date}</Caption>
                        </div>
                        {index !== ITEMS_PER_SECTION - 1 && <div className="border-t w-full my-2 max-w-xs"></div>}
                    </div>
                ))}
                </div>
                <Button variant="tertiary" size="small" onClick={handleNext} disabled={currentIndex + ITEMS_PER_SECTION >= data.length}><FaArrowAltCircleRight size={24} /></Button>
            </div>
        </Paper>
    );
};



const Hyperlink = ({children, href}) => {
    
        return(
            <a className="text-blue-500 hover:text-blue-700" href={href}>{children}</a>
        )
    }


interface Jobs {

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
}


const JobsCard = ({data}) => {

        return (
            <div className="bg-white p-4 flex flex-1 flex-col min-h-[calc(100vh-400px)]">
                <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-1 mb-2">
                <H3>Jobs</H3>
                <Caption>{data.length} results</Caption>
                </div>
                <Button variant="tertiary" size="small" onClick={() => {}} >Add Job</Button>
                </div>
                {data.length === 0 && <EmptyState message="No jobs found." />}
                {data.map((item: Jobs) => {
                    return(
                        <div key={item.jobID} className="flex flex-col mb-4 border-b border-slate-100 pb-4 gap-1">
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
                        <KPI title="Rejected">{item.rejected}</KPI>
                        </div>
                        </div>
                    )
                }
                )}
            </div>
        )
    }


    const KPI = ({children, title='title'}) => {

        return(
            <div className="flex flex-col items-center justify-center w-full h-12 bg-slate-100">
            <Caption>{title}</Caption>
            <div className="text-slate-500 text-lg font-bold">{children}</div>
            </div>
        )
    }

    interface Location {
        locationID: number;
        officeType: string;
        address: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    }

    const LocationCard = ({data}) => {

        return (
            <Paper>
                <div className="flex flex-1 flex-col gap-4 justify-between items-center p-4 min-w-[300px]">
                    <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col gap-1">
                    <H4>Locations</H4>
                    <Caption>{data.length} results</Caption>
                    </div>
                    <Button variant="tertiary" size="small" onClick={() => {}} >Add Location</Button>
                    </div>
                    <ul className="flex flex-col w-full">
                        {data.length === 0 && <EmptyState message="No locations found." />}
                        {data.map((item: Location) => (
                            <li key={item.locationID}>
                            <H4>{item.officeType}</H4> 
                                <P2>{item.address}</P2>
                                <div className="flex flex-row gap-2">
                                <P2>{item.city}, {item.country}</P2>
                                </div>
                                <P2>{item.postalCode}</P2>
                            </li>
                        ))}
                    </ul>
                </div>
            </Paper>
        )
    }

    const Notes = () => {

        const [notes, setNotes] = useState([]);
        const [inputValue, setInputValue] = useState('');
        const [isModalOpen, setIsModalOpen] = useState(false); 
        const [deleteModalOpen, setDeleteModalOpen] = useState(false);
        const [deleteIndex, setDeleteIndex] = useState(null);

        const { organisationID } = useParams();

      
        const handleInputChange = (e) => {
          setInputValue(e.target.value);
        };

        useEffect(() => {
            fetch('http://localhost:3001/notes')
                .then((response) => response.json())
                .then((data) => setNotes(data));
        }
        , []);
      
        const handleAddTask = () => {
            if (inputValue !== '') {
                fetch('http://localhost:3001/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: inputValue,
                        organisationID: organisationID, // send organisationID with the request
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    setNotes([...notes, data]);
                    setInputValue('');
                    setIsModalOpen(false);
                });
            }
        };
             
        const handleDeleteTask = (index) => {
            setDeleteIndex(index);
            setDeleteModalOpen(true);
        };
    
        const confirmDelete = () => {
            if (deleteIndex !== null) {
                const noteToDelete = notes[deleteIndex];
                
                fetch(`http://localhost:3001/notes/${noteToDelete.id}`, {
                    method: 'DELETE',
                })
                .then((response) => {
                    if (response.ok) {
                        const newNotes = [...notes];
                        newNotes.splice(deleteIndex, 1);
                        setNotes(newNotes);
                    } else {
                        throw new Error('Failed to delete the note.');
                    }
                })
                .catch((error) => {
                    console.error("Error deleting note: ", error);
                })
                .finally(() => {
                    setDeleteModalOpen(false);
                    setDeleteIndex(null);
                });
            }
        };       
        
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }        
      
        return (
            <Paper>
                    <div className="flex flex-row justify-between items-center p-4">
                    <div className="flex flex-col gap-1">
                    <H4>Notes</H4>
                    <Caption>{notes.length} results</Caption>
                    </div>
                    <Button variant="tertiary" size="small" onClick={() => setIsModalOpen(true)}>Add Note</Button>
                    </div>
                
                <ul className="p-4">
                    {notes.length === 0 && <EmptyState message="No notes found." />}
                    {notes.map((note, index) => (
                        <li key={index} className="flex mb-2 justify-between items-top flex-wrap text-ellipsis">
                            <div className="flex flex-col gap-2">
                            <P>{note.text}</P>
                            <Caption>{formatDate(note.created_at)}</Caption>
                            </div>
                        <button onClick={() => handleDeleteTask(index)}><FaTrash /></button>
                        </li>
                    ))}
                </ul>
            {isModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                  <H4>Add a new note</H4>
                  <textarea 
                    className="border p-2 w-full rounded mt-2 min-w-[400px] max-w-[500px]"
                    rows={5}
                    maxLength={255}
                    value={inputValue}
                    onChange={handleInputChange} 
                    placeholder="Type your note..."
                  />
                  <div className="flex gap-2 justify-end mt-4">
                    <Button variant="primary" onClick={handleAddTask}>Add</Button>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}

            {deleteModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <H4>Are you sure you want to delete this note?</H4>
                        <div className="flex gap-2 justify-end mt-4">
                            <Button variant="primary" onClick={confirmDelete}>Confirm</Button>
                            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}
          </Paper>
        );
      };



interface Client {
            clientID: number;
            organisationID: number;
            clientName: string;
            contactEmail: string;
            phoneNumber: string;
            industryCategory: string;
            location: string;
        }

    const ClientContacts = ({data}) => {

        return (
            <Paper>
                <div className="flex flex-row gap-2 p-4 items-center justify-between">
                <div className="flex flex-col gap-2">
                    <H4>Client Contacts</H4>
                    <Caption>{data.length} results</Caption>
                </div>
                    <Button variant="tertiary" size="small" onClick={() => {}} >Add Contact</Button>
                </div>
                <ul className="flex flex-col gap-8 p-4">
                    {data.length === 0 && <EmptyState message="No clients found." />}
                    {data.map((item: Client) => (
                        <li key={item.clientID} className="flex flex-col">
                           <H4>{item.clientName}</H4> 
                            <P2>{item.contactEmail}</P2>

                            <div className="flex flex-row gap-2">
                            <P2>{item.phoneNumber}</P2>
                            </div>
                            <Breadcrumbs items={[item.industryCategory, item.location]} />
                        </li>
                    ))}
                </ul>
                
            </Paper>
        )

    }

    interface EmptyStateProps {
        message: string;
      }
      
      const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
        return (
          <div className="flex flex-1 items-center justify-center border border-cyan-800 rounded-md border-dotted min-h-[200px]">
            {message}
          </div>
        );
      };




