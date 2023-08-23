import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Template } from ".";
import { H4 } from "../Typography";
import { Paper, ListItem, Notes, HeaderCard, ActivityCard } from "../Components";
import { FaPaperPlane } from "react-icons/fa";



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
                        <Template top={ <CandidateCard data={candidateData} userData={userData} /> } left={<ActivityCard />} middle={<CareerHistory />} right={ <><Notes /> <SkillsCard /></> } leftheading="Career History" middleheading="hello" rightheading="Notes" />
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

  const responsibleAgentName = userData.find(user => user.userID === data.responsibleAgent)?.userName || data.responsibleAgent;
  const addedByName = userData.find(user => user.userID === data.addedBy)?.userName || data.addedBy;

  return (
    <Paper>
      <div className="flex flex-col flex-1 gap-1">
        <HeaderCard heading={data.name} subHeading={data.currentJob} headingSize={false} />
        <div className="grid grid-cols-4">
          <ListItem title='Location'>{data.location}</ListItem>
          <ListItem title='Current Job'>{data.currentJob}</ListItem>
          <ListItem title='Review Date'>{new Date(data.reviewDate).toLocaleDateString()}</ListItem>
          <ListItem title='Review Status'>{data.reviewStatus}</ListItem>
          <ListItem title='Current Company'>{data.currentCompany}</ListItem>
          <ListItem title='Job Type'>{data.jobType}</ListItem>
          <ListItem title='Salary Range'>{data.salaryRange}</ListItem>
          <ListItem title='Objective'>{data.objective}</ListItem>
          <ListItem title='Responsible Agent'>{responsibleAgentName}</ListItem>
          <ListItem title='Added By'>{addedByName}</ListItem>
          </div>
      </div>
    </Paper>
  );
}


const SkillsCard = () => {

const  data = [  
    {
      language: ['English ', 'French ', 'Spanish '],
      industry: ['Banking ', 'Finance ', 'Accounting '],
      skills: ['Excel ', 'Powerpoint ', 'Word ']
    },
  ]

  return (
    <Paper>
    <div className="flex flex-col gap-4">
      <HeaderCard heading='Skills' />
      <div className="flex flex-col gap-4">
        {data.map((skill, index) =>
          <div key={index} className="flex flex-col gap-2">
            <ListItem title='Language'>{skill.language}</ListItem>
            <ListItem title='Industry'>{skill.industry}</ListItem>
            <ListItem title='Skills'>{skill.skills}</ListItem>
          </div>
        )}
      </div>
    </div>
  </Paper>
  );
}



const CareerHistory = () => {

  const data = [
    {
      companyName: 'HSBC',
      jobTitle: 'Accountant',
      startDate: '20-10-2020',
      endDate: '20-10-2020',
      totalPackage: '£50,000',
      packageBreakdown: '£40,000 basic, £10,000 bonus',
      currency: 'GBP',
      salaryPeriod: 'annum',
      noticePeriod: '1 month',
      location: 'London',
      reasonForLeaving: 'lack of progression'
    },
    {
      companyName: 'HSBC',
      jobTitle: 'Accountant',
      startDate: '20-10-2020',
      endDate: '20-10-2020',
      totalPackage: '£50,000',
      packageBreakdown: '£40,000 basic, £10,000 bonus',
      currency: 'GBP',
      salaryPeriod: 'annum',
      noticePeriod: '1 month',
      location: 'London',
      reasonForLeaving: 'lack of progression'
    },
  ]

  return (
          <Paper>
            <HeaderCard heading='Career History' />
            {data.map((career, index) => <CareerCard key={index} data={career} />)}
          </Paper>
  );
}


const CareerCard = ({ data }: any) => {
  return (
        <div className="grid grid-cols-2 bg-white p-2">
          <ListItem title='Company Name'>{data.companyName}</ListItem>
          <ListItem title='Job Title'>{data.jobTitle}</ListItem>    
          <ListItem title='Start Date'>{data.startDate}</ListItem>
          <ListItem title='End Date'>{data.endDate}</ListItem>
          <ListItem title='Reason for Leaving'>{data.reasonForLeaving}</ListItem>
          <ListItem title='Notice Period'>{data.noticePeriod}</ListItem>
          <ListItem title='Location'>{data.location}</ListItem>
          <ListItem title='Package Breakdown'>{data.packageBreakdown}</ListItem>
          <ListItem title='Total Package'>{data.totalPackage}</ListItem>
          </div>
  );
}

