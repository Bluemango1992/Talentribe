import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from ".";
import { Paper, Chip, ListItem, KPI, ActivityCard, ClientContacts, HeaderCard, SelectField } from "../Components";
import { H3, P2 } from "../Typography";
import { Template } from ".";

const JobsProfile = () => {


    const [jobData, setJobData] = useState<any | null>(null);
    const [organisationData, setOrganisationData] = useState<any | null>(null);
    const [clientData, setClientData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const { jobID } = useParams<{ jobID: string }>();

    const jobsSpecData = [
        { title: 'Location', content: 'London' },
        { title: 'Salary Range', content: '£30,000 - £40,000' },
        { title: 'Job Type', content: 'Permanent' },
        { title: 'Job Title', content: 'Software Developer' },
        { title: 'Job Description', content: 'Lorem ipsum ...' },
        { title: 'Job Requirements', content: 'Lorem ipsum ...' },
        { title: 'Job Responsibilities', content: 'Lorem ipsum ...' },
        { title: 'Job Benefits', content: 'Lorem ipsum ...' }
    ];

    const jobDetailsData = [
        { title: 'Working Location', content: 'London' },
        { title: 'Working Hours', content: '9am - 5pm' },
        { title: 'Preferred Start Date', content: 'ASAP' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
            // Fetch job details
            const jobResponse = await fetch('http://localhost:3001/jobs');
            const jobDataArray = await jobResponse.json();
            const filteredJob = jobDataArray.find((job: any) => job.jobID === Number(jobID));
            setJobData(filteredJob);
            
            // Fetch organisation details using organisationID from the job data
            if (filteredJob && filteredJob.organisationID) {
                const organisationResponse = await fetch('http://localhost:3001/organisations');
                const organisations = await organisationResponse.json();
                const organisation = organisations.find((org: any) => org.organisationID === filteredJob.organisationID);
                setOrganisationData(organisation);
            }

            // Fetch client details using clientID from the job data
            if (filteredJob && filteredJob.clientID) {
                const clientsResponse = await fetch('http://localhost:3001/clients');
                const clientsData = await clientsResponse.json();
                const filteredClients = clientsData.filter((client: any) => client.organisationID === Number(filteredJob.clientID));
                setClientData(filteredClients);
            }
            
            setLoading(false);
        }
        fetchData();
    }, [jobID]);

    return (
        <Layout>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {jobData ? (
                        <>
                            <Template top={<JobCard data={jobData} organisationData={organisationData} /> } left={<ActivityCard />} middle={<JobSpec data={jobsSpecData} />} right={<><DetailCard data={jobDetailsData} /><ClientContacts data={clientData} /></>} />
                        </>
                    ) : (
                        <p>No data found</p>
                    )}
                </>
            )}
        </Layout>
    );
}

type JobCardProps = {
    data: {
        jobID: number;
        title: string;
        organisationID: number;
        location: string;
        salaryRange: string;
        jobType: string;
        lastActivity: string;
        shortlist: number;
        CVsent: number;
        interview: number;
        offer: number;
        placement: number;
        status: string;
    },
    organisationData: {
        organisationID?: number;
        companyName?: string;
    } | null;
}

const JobCard = ({data, organisationData} : JobCardProps) => {
    return (
        <Paper>                  
                    <HeaderCard heading={data.title} subHeading={data.jobType} headingSize={false} />
                    <div className="flex flex-1 items-center justify-between gap-1 p-4">
                        <div className="grid grid-cols-2 gap-1">
                        <ListItem title='Company Name'>
                        {organisationData && <P2> {organisationData.companyName}</P2>}
                        </ListItem>
                        <ListItem title='Location'>{data.location}</ListItem>
                        <ListItem title='Salary Range'>{data.salaryRange}</ListItem>                        
                        <ListItem title='Job Type'>{data.jobType}</ListItem>
                        </div>
                    <div className="flex flex-col justify-between min-w-[200px] gap-1">
                        <ListItem title='Last Activity'>{new Date(data.lastActivity).toLocaleDateString()}</ListItem>
                        <div className="flex justify-between">
                        <KPI title='Shorlist'>{data.shortlist}</KPI>
                        <KPI title='CV Sent'>{data.CVsent}</KPI>
                        <KPI title='Interview'>{data.interview}</KPI>
                        <KPI title='Offer'>{data.offer}</KPI>
                        <KPI title='Placement'>{data.placement}</KPI>
                        </div>
                      </div>  
        
                    <SelectField options={['Active', 'Inactive']} placeholder='Status' />
                    </div>
        </Paper>
    );
}

export default JobsProfile;

const JobSpec = ({ data }) => {
    return (
        <Paper>
            <HeaderCard heading='Job Specification' />
            <div className="flex flex-col flex-1 gap-1">
                {data.map((item, index) => (
                    <ListItem key={index} title={item.title}>
                        {item.content}
                    </ListItem>
                ))}
            </div>
        </Paper>
    );
}


const DetailCard = ({data}) => {
    return (
        <Paper>
            <HeaderCard heading='Details' />
            <div className="flex flex-col flex-1 gap-1">
                {data.map((item, index) => (
                    <ListItem key={index} title={item.title}>
                        {item.content}
                    </ListItem>
                ))}
            </div>
        </Paper>
    );
}
