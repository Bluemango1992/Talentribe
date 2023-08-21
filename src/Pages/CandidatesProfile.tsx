import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from ".";
import { H2, P2 } from "../Typography";
import { Paper, ListItem } from '../Components';

const CandidateProfile = () => {

  const [candidateData, setJobData] = useState<any | null>(null);
  const [userData, setUserData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { candidateID } = useParams<{ candidateID: string }>();

  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          
          // Fetch candidate details
          const jobResponse = await fetch('http://localhost:3001/candidates');
          const candidateDataArray = await jobResponse.json();
          const filteredJob = candidateDataArray.find((job: any) => job.candidateID === Number(candidateID));
          setJobData(filteredJob);
          
          // Fetch all users
          const userResponse = await fetch('http://localhost:3001/users');
          const users = await userResponse.json();
          setUserData(users);
          
          setLoading(false);
      }
      fetchData();
  }, [candidateID]);

  return (
      <Layout>
          {loading ? (
              <div className="flex justify-center items-center h-screen">
                  <p>Loading...</p>
              </div>
          ) : (
              <>
                  {candidateData ? (
                      <>
                          <CandidateCard data={candidateData} userData={userData} />
                      </>
                  ) : (
                      <p>No data found</p>
                  )}
              </>
          )}
      </Layout>
  );
}

export default CandidateProfile;

type CandidateCardProps = {
  data: {
      candidateID: number;
      name: string;
      reviewDate: string;
      reviewStatus: string;
      responsibleAgent: number;
      addedBy: number;
      currentJob: string;
      currentCompany: string;
      location: string;
      objective: string;
      jobType: string;
      salaryRange: string;
  };
  userData: {
    userID: number;
    userName: string;
  }[];
}

const CandidateCard = ({ data, userData }: CandidateCardProps) => {
  // Finding the user names for responsibleAgent and addedBy
  const responsibleAgentName = userData.find(user => user.userID === data.responsibleAgent)?.userName || data.responsibleAgent;
  const addedByName = userData.find(user => user.userID === data.addedBy)?.userName || data.addedBy;

  return (
    <Paper>
      <div className="flex flex-col gap-4 p-8">
          <H2>{data.name}</H2>
          <ListItem title='Review Date'>{new Date(data.reviewDate).toLocaleDateString()}</ListItem>
          <ListItem title='Review Status'>{data.reviewStatus}</ListItem>
          <ListItem title='Location'>{data.location}</ListItem>
          
          <ListItem title='Current Company'>{data.currentCompany}</ListItem>
          <ListItem title='Current Job'>{data.currentJob}</ListItem>
          <ListItem title='Job Type'>{data.jobType}</ListItem>
          <ListItem title='Salary Range'>{data.salaryRange}</ListItem>
          
          <ListItem title='Objective'>{data.objective}</ListItem>
          
          <ListItem title='Responsible Agent'>{responsibleAgentName}</ListItem>
          <ListItem title='Added By'>{addedByName}</ListItem>
      </div>
    </Paper>
  );
}

