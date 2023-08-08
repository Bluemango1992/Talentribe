import { FaAngry, FaArrowDown, FaPhone } from 'react-icons/fa';
import { H1, H2, H3, H4, P } from '../Typography';
import { Breadcrumbs, TabBar, Paper , FAB } from '../Components';
import Layout from './Layout';
import { useEffect, useState } from 'react';


const Clients = () => {

  const [clientdata, setClientData] = useState<ActivityCardProps[]>([]);
  useEffect(() => {
    fetch('http://localhost:3001/Clients')
      .then(response => response.json())
      .then(data => setClientData(data))
      .catch(error => console.log(error));
  }, []);
  
    return (
      <Layout>
        <ClientsCard />
        <div className='grid grid-cols-3 gap-4 m-8'>
          {clientdata.map(clientjobs => (
            <ActivityCard 
            title={clientjobs.title}
            status={clientjobs.status}
            description={clientjobs.description}
            location={clientjobs.location}
            salary={clientjobs.salary}
            JobType={clientjobs.JobType}  
            taxtype={clientjobs.taxtype}
          />          
          ))}
        </div>
      </Layout>
    )
  }

  export default Clients;
  
  const ClientsCard = () => {
    return (
      <Paper>
        <div className='flex flex-row items-center gap-4 p-8'>
          <div className='w-32 h-32 rounded-full border border-gray-200 flex items-center justify-center'>
            <H1 theme='light'>JD</H1>
          </div>
          <div className='flex flex-1 flex-col gap-2'>
          <H2 theme='light'>Client Name</H2>
          <P theme='light'>Company Name</P>
          <P theme='light'>Company Address</P>
          <Breadcrumbs items={['New York', 'Permanent', 'GBP £60k pa base', 'PAYG']} theme='light' />
          </div>
          <div className='flex flex-row gap-3'>
          <FAB icon={<FaAngry />} />
          <FAB icon={<FaPhone />} />
          <FAB icon={<FaArrowDown />} />
          </div>
          </div>
        <TabBar tabs={['Summary', 'Activity', 'Personal', 'Career', 'Documents', 'Internal']} theme='dark' />
      </Paper>
    )
  }

  interface ActivityCardProps {
    title: string;
    status: string;
    description: string;
    location: string;
    salary: string;
    JobType: string;
    taxtype: string;
  }
  
  
  const ActivityCard: React.FC<ActivityCardProps> = ({title, status, description, salary, location, JobType, taxtype}) => {
  
    return (
      <Paper>
        <H4>{title}</H4>
        <Pill variant={status} />
        <P>{description}</P>
        <Breadcrumbs items={[location, salary, JobType, taxtype]} />
      </Paper>
    );
  }

  interface PillProps {
    variant: string;
  }
  
  const Pill: React.FC<PillProps> = ({variant}) => {
    let bgColor;
    let text;
  
    switch(variant) {
      case 'Active':
        bgColor = 'bg-green-500';
        text = "Active";
        break;
      case 'Open':
        bgColor = 'bg-blue-500';
        text = "Open";
        break;
      case 'Inactive':
      default:
        bgColor = 'bg-slate-400';
        text = "Completed";
        break;
    }
  
    return (
      <div className={`${bgColor} px-4 py-1 rounded-full w-max text-white text-md font-semibold`}>
        {text}
      </div>
    )
  }
  