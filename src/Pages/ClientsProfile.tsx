import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from ".";
import { Paper } from '../Components';
import { Caption, H1, H3, P2 } from "../Typography";

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
                            <ClientCard data={clientData} organisationData={organisationData} />
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
        organisationID: number;
        companyName: string;
        industryCategory: string;
        location: string;
    };
    organisationData: {
        organisationID: number;
        companyName: string;
        industry: string;
        location: string;
        lastClientContact: string;
    } | null;
};

const ClientCard = ({ data, organisationData }: ClientCardProps) => {
    return (
        <Paper>
            <div className="flex justify-between items-center mb-4 p-4">
                <div>
                    <H1>{data.clientName}</H1>
                    <Caption>{data.contactEmail}</Caption>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <H3>Organisation</H3>
                    <P2>{organisationData?.companyName}</P2>
                </div>
                <div>
                    <Caption>Organisation ID: {organisationData?.organisationID}</Caption>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <H3>Location</H3>
                    <P2>{data.location}</P2>
                </div>
                <div>
                    <Caption>Industry: {organisationData?.industry}</Caption>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <H3>Contact</H3>
                    <P2>{data.phoneNumber}</P2>
                </div>
                <div>
                    <Caption>Last contact: {organisationData?.lastClientContact}</Caption>
                </div>
            </div>
        </Paper>
    );
}
