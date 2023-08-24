import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Template } from ".";
import { Paper, ListItem, HeaderCard, ActivityCard } from "../Components";

const ClientsProfile = () => {
    const [clientData, setJobData] = useState<any | null>(null);
    const [organisationData, setOrganisationData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const { clientID } = useParams<{ clientID: string }>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
            // Fetch client details
            const jobResponse = await fetch('http://localhost:3001/clients');
            const clientDataArray = await jobResponse.json();
            const filteredJob = clientDataArray.find((job: any) => job.clientID === Number(clientID));
            setJobData(filteredJob);
            
            // Fetch organisation details using organisationID from the client data
            if (filteredJob && filteredJob.organisationID) {
                const organisationResponse = await fetch('http://localhost:3001/organisations');
                const organisations = await organisationResponse.json();
                const organisation = organisations.find((org: any) => org.organisationID === filteredJob.organisationID);
                setOrganisationData(organisation);
            }
            
            setLoading(false);
        }
        fetchData();
    }, [clientID]);

    return (
        <Layout>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {clientData ? (
                        <>
                            <Template top={ <ClientCard data={clientData} organisationData={organisationData} /> } left={<ActivityCard />} middle={<></>} right={<></>} />
                        </>
                    ) : (
                        <p>No data found</p>
                    )
                    }
                </>
            )}
        </Layout>
    );
}

export default ClientsProfile;

type ClientCardProps = {
    data: {
        clientID: number;
        clientName: string;
        contactEmail: string;
        phoneNumber: string;
        location: string;
        organisationID: number;
    };
    organisationData: {
        companyName: string;
        industry: string;
    } | null;
}

const ClientCard = ({ data, organisationData }: ClientCardProps) => {
    return (
        <Paper>
            <div className="flex flex-col flex-1 gap-1">
                <HeaderCard heading={data.clientName} subHeading={data.contactEmail} headingSize={false} />
                <div className="grid grid-cols-4">
                    <ListItem title='Contact Email'>{data.contactEmail}</ListItem>
                    <ListItem title='Phone Number'>{data.phoneNumber}</ListItem>
                    <ListItem title='Location'>{data.location}</ListItem>
                    <ListItem title='Organisation'>{organisationData?.companyName}</ListItem>
                    <ListItem title='Industry'>{organisationData?.industry}</ListItem>
                </div>
            </div>
        </Paper>
    );
}
