import Layout from './Layout';
import { Caption, H3, H4, P, P2 } from '../Typography';
import { Button, Paper } from '../Components';
import { useState, useEffect } from 'react';


const Organisations = () => {

  const [organisationData, setOrganisationData] = useState<OrganisationCardProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/organisations')
      .then(response => response.json())
      .then(data => setOrganisationData(data))
      .catch(error => console.log(error));
  }, []);
  
    return (
      <Layout>
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex flex-row justify-between items-center'>
            <H3>Organisations</H3>
            <Button onClick={() => {}} theme='dark' variant='secondary'>Add Organisation</Button>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {organisationData.map((org) => (
              <OrganisationCard key={org.id} org={org} />
            ))}
          </div>
        </div>
      </Layout>
    )
  }

export default Organisations;
  
interface OrganisationCardProps {
  id: number;
  name: string;
  industry: string;
  liveJobs: number;
  lastClientContacted: string;
  lastContacted: string;
}

  
  const OrganisationCard = ({ org }: { org: OrganisationCardProps }) => {
    return (
      <Paper>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between items-center'>
              <H4>{org.name}</H4>
              <P2>Live Jobs: {org.liveJobs}</P2>
            </div>
            <P>Industry: {org.industry}</P>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <Caption>Last Contacted: {org.lastContacted}</Caption>
            <Caption>Last Contacted By: {org.lastClientContacted}</Caption>
          </div>
        </div>
      </Paper>
    )
  }