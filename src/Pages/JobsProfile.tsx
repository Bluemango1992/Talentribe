import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from ".";
import { Paper, Chip } from '../Components';
import { Caption, H1, H3, P2 } from "../Typography";

const JobsProfile = () => {
    const [jobData, setJobData] = useState<any | null>(null);
    const [organisationData, setOrganisationData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const { jobID } = useParams<{ jobID: string }>();

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
                            <JobCard data={jobData} organisationData={organisationData} />
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
            <div className="flex flex-1 justify-between items-center mb-4 p-8">                    
                <div className="flex flex-col gap-2">
                    <H3>{data.title}</H3>
                        <ListItem title='Company Name'>
                        {organisationData && <P2> {organisationData.companyName}</P2>}
                        </ListItem>
                        <ListItem title='Location'>{data.location}</ListItem>
                        <ListItem title='Salary Range'>{data.salaryRange}</ListItem>                        
                        <ListItem title='Job Type'>{data.jobType}</ListItem>
                    </div>

                    <div className="flex flex-col gap-4 w-1/2">
                        <ListItem title='Last Activity'>{new Date(data.lastActivity).toLocaleDateString()}</ListItem>
                    <div className="flex flex-row justify-between">
                        <KPI title='Shorlist'>{data.shortlist}</KPI>
                        <KPI title='CV Sent'>{data.CVsent}</KPI>
                        <KPI title='Interview'>{data.interview}</KPI>
                        <KPI title='Offer'>{data.offer}</KPI>
                        <KPI title='Placement'>{data.placement}</KPI>  
                    </div>
                </div>
                    <Chip>{data.status}</Chip>
                </div>
        </Paper>
    );
}

export default JobsProfile;


const ListItem = ({ title, children }: any) => {
    return (
        <div className="flex flex-col gap-1">
            <Caption>{title}</Caption>
            <P2>{children}</P2>
        </div>
    );
}

const KPI = ({ title, children }: any) => {
    return (
        <div className="flex flex-col gap-1">
            <Caption>{title}</Caption>
            <H1>{children}</H1>
        </div>
    );
}


