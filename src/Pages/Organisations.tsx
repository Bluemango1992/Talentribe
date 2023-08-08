import Layout from './Layout';
import { H3, P2 } from '../Typography';
import { Paper } from '../Components';


const Organisations = () => {
    const organisationData = [
      {
        id: 1,
        name: 'HSBC',
        industry: 'Banking & Fianance',
        liveJobs: 10,
        lastClientContacted: 'Joe Doe',
        lastContacted : '01/01/2021',
      },
      {
        id: 2,
        name: 'Barclays', 
        industry: 'Banking & Fianance',
        liveJobs: 10,
        lastClientContacted: 'Joe Doe',
        lastContacted : '01/01/2021',
      },
      {
        id: 3,
        name: 'Lloyds',
        industry: 'Banking & Fianance',
        liveJobs: 10,
        lastClientContacted: 'Joe Doe',
        lastContacted : '01/01/2021',
      },
    ]
  
    return (
      <Layout>
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex gap-4'>
            <H3>Organisations</H3>
            <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Add Organisation</button>
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
    org: {
      id: number;
      name: string;
      industry: string;
      liveJobs: number;
      lastClientContacted: string;
      lastContacted: string;
    }
  }
  
  
  const OrganisationCard = ({ org }: OrganisationCardProps) => {
    return (
      <Paper>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between items-center'>
              <H3>{org.name}</H3>
              <P2>Live Jobs: {org.liveJobs}</P2>
            </div>
            <P2>Industry: {org.industry}</P2>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <P2>Last Contacted: {org.lastContacted}</P2>
            <P2>Last Contacted By: {org.lastClientContacted}</P2>
          </div>
        </div>
      </Paper>
    )
  }