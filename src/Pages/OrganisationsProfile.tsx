import { useState } from "react"
import { Layout } from "."
import { Paper, Breadcrumbs, Button, Chip, FAB } from '../Components'
import { H3, H4, P, Caption, P2, H5 } from "../Typography"
import { FaBuilding, FaInternetExplorer, FaPhone, FaTrash, FaVoicemail, FaWeibo } from "react-icons/fa"

const OrganisationsProfile = () => {

    return(
        <Layout>
            <div className="flex flex-col mb-4 ju">
            <OrganistionsCard />
            <HistoryCard />
            </div>
            <div className="flex gap-3">
                <div className="flex flex-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <JobsCard />
                </div>
            <div className="flex flex-col gap-4 flex-1">
            <LocationCard />
            <Notes />
            </div>
            </div>
        </Layout>
    )
}


export default OrganisationsProfile

const company = {
    name: 'Helen Keller International',
    industry: 'Non-Profit',
    location: 'New York, NY',
    website: 'https://www.hki.org/',
}


const OrganistionsCard = () => {
    
        return(
            <Paper>
                <div className="flex flex-row gap-4 p-4 items-center justify-between">
                      
                <div className="flex flex-col gap-1 p-4"> 
                <H3>{company.name}</H3>
                <Breadcrumbs items={[company.industry, company.location]} />
                <Hyperlink href={company.website}>{company.website}</Hyperlink>
                </div>
                <ClientContacts />
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
            <div className="flex flex-col items-center p-4">
                <div className="flex flex-row items-center justify-between w-full">
                {data.slice(currentIndex, currentIndex + ITEMS_PER_SECTION).map((activity, index) => (
                    <div key={activity.activityID} className="flex items-center gap-4 rounded-full w-full">
                        <div className="w-8 h-8 flex justify-center items-center rounded-md bg-slate-100">{currentIndex + index + 1}</div>
                        <div className="flex flex-col min-w-max">
                            <H5>{activity.userID}</H5>
                            <P>{activity.action}</P>
                            <Caption>{activity.date}</Caption>
                        </div>
                        {index !== ITEMS_PER_SECTION - 1 && <div className="border-t w-full my-2 max-w-xs"></div>}
                    </div>
                ))}
                </div>
                <div className="flex flex-row items-center justify-between w-full mt-1">
                <Button variant="tertiary" size="small" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
                <Button variant="tertiary" size="small" onClick={handleNext} disabled={currentIndex + ITEMS_PER_SECTION >= data.length}>Next</Button>
            </div> 
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
    jobtitle: string;
    client: string;
    location: string;
    jobtype: string;
    salary: string;
    Shortlist: number;
    CVsent: number;
    Interview: number;
    Offer: number;
    Rejected: number;
}


const JobsCard = () => {
    
        const data = [
            { jobtitle : 'Software Engineer', client : 'Helen Keller International', location : 'New York, NY', jobtype : 'Permanent', salary : '£100,000-£150,000', Shortlist : 1, CVsent : 2, Interview : 1, Offer : 0, Rejected : 0},
            { jobtitle : 'Software Engineer', client : 'Helen Keller International', location : 'New York, NY', jobtype : 'Permanent', salary : '£100,000-£150,000', Shortlist : 1, CVsent : 2, Interview : 1, Offer : 0, Rejected : 0},
        ]

        return (
            <div className="bg-white p-4 flex flex-1 flex-col" >
                <div className="flex flex-col gap-1 mb-3 border-b border-slate-100 pb-3">
                <H3>Jobs</H3>
                <Caption>{data.length} results</Caption>
                </div>
                {data.map((item: Jobs) => {
                    return(
                       <div className="flex flex-col mb-4 border-b border-slate-100 pb-4 gap-1">
                        <div className="flex flex-row justify-between">
                        <H4>{item.jobtitle}</H4>
                        <Chip>{item.jobtype}</Chip>
                        </div>
                        <div className="flex flex-col justify-between gap-1 m-1">
                        <P2>{item.location}</P2>
                        <Caption>{item.salary}</Caption>
                        </div>
                        
                        <div className="flex flex-1 gap-1">
                        <KPI title="Shortlist">{item.Shortlist}</KPI>
                        <KPI title="CV sent">{item.CVsent}</KPI>
                        <KPI title="Interview">{item.Interview}</KPI>
                        <KPI title="Offer">{item.Offer}</KPI>
                        <KPI title="Rejected">{item.Rejected}</KPI>
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

    const LocationCard = () => {

        const data = [
            {
                locationID : 1,
                officeType : "Head Office",
                address : "123 Main Street",
                city : "New York",
                state : "NY",
                country : "USA",
                postalCode : "12345"
            },
            {
                locationID : 2,
                officeType : "Head Office",
                address : "123 Main Street",
                city : "New York",
                state : "NY",
                country : "USA",
                postalCode : "12345"
            },
            {
                locationID : 3,
                officeType : "Head Office",
                address : "123 Main Street",
                city : "New York",
                state : "NY",
                country : "USA",
                postalCode : "12345"
            },
            {
                locationID : 4,
                officeType : "Head Office",
                address : "123 Main Street",
                city : "New York",
                state : "NY",
                country : "USA",
                postalCode : "12345"
            },

        ]
    
        return (

            <Paper>
                <div className="flex flex-row gap-2 p-4 items-center justify-between">
                    <H4>Locations</H4>
                    <Button variant="tertiary" size="small" onClick={() => {}} >Add Location</Button>
                </div>
                <ul className="flex flex-wrap gap-8 p-4">
                    {data.map((item: Location) => (
                        <li key={item.locationID} className="flex flex-col">
                           <H4>{item.officeType}</H4> 
                            <P2>{item.address}</P2>

                            <div className="flex flex-row gap-2">
                            <P2>{item.city}, {item.country}</P2>
                            </div>
                            <P2>{item.postalCode}</P2>
                        </li>
                    ))}
                </ul>
            </Paper>
        )
    }

    const Notes = () => {
        const [tasks, setTasks] = useState([]);
        const [inputValue, setInputValue] = useState('');
        const [isModalOpen, setIsModalOpen] = useState(false); 
        const [deleteModalOpen, setDeleteModalOpen] = useState(false);
        const [deleteIndex, setDeleteIndex] = useState(null);
      
        const handleInputChange = (e) => {
          setInputValue(e.target.value);
        };
      
        const handleAddTask = () => {
          if (inputValue.trim() !== '') {
            setTasks([...tasks, { text: inputValue, completed: false }]);
            setInputValue('');
            setIsModalOpen(false); // Close the modal after adding a task
          }
        };

        const handleDeleteTask = (index) => {
            setDeleteIndex(index);
            setDeleteModalOpen(true);
        };
    
        const confirmDelete = () => {
            if (deleteIndex !== null) {
                const newTasks = [...tasks];
                newTasks.splice(deleteIndex, 1);
                setTasks(newTasks);
            }
            setDeleteModalOpen(false);
            setDeleteIndex(null);
        };
      
        return (
            <Paper>
                <div className="flex flex-row gap-2 p-4 items-center justify-between">
                    <H4>Notes</H4>
                    <Button variant="tertiary" size="small" onClick={() => setIsModalOpen(true)}>Add Note</Button>
                </div>
                <ul className="p-4">
                    {tasks.map((task, index) => (
                        <li key={index} className="flex mb-2 justify-between items-center flex-wrap text-ellipsis">
                            {task.text}
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
                    rows="5"
                    maxLength={255}
                    value={inputValue}
                    onChange={handleInputChange} 
                    placeholder="Type your note..."
                  />
                  <div className="flex gap-2 justify-end mt-4">
                    <Button variant="primary" theme="dark" onClick={handleAddTask}>Add</Button>
                    <Button variant="secondary" theme="dark" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}

            {deleteModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <H4>Are you sure you want to delete this note?</H4>
                        <div className="flex gap-2 justify-end mt-4">
                            <Button variant="primary" theme="dark" onClick={confirmDelete}>Confirm</Button>
                            <Button variant="secondary" theme="dark" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}
          </Paper>
        );
      };

const ClientContacts = () => {

const data = [
        {
          clientName: "Robert Brown",
          contactEmail: "robertb@example.com",
          phoneNumber: "+1234567890",
          department : "HR",
          location: "San Francisco"
        },
        {
          clientName: "Emily White",
          contactEmail: "emilyw@example.com",
          phoneNumber: "+0987654321",
          department : "Accounting",
          location: "London"
        }
      ]

    return(
        
            <div className="flex">
            {data.map((item: any) => {
                return(
                    <div className="flex flex-col mx-4">
                    <H4>{item.clientName}</H4>
                    <P>{item.contactEmail}</P>
                    <Caption>{item.phoneNumber}</Caption>
                    <Breadcrumbs items={[item.department, item.location]} />
                    </div>                                      
                    )
                }
            )}
            </div>
    )

}




