
import { Paper , Breadcrumbs } from '../Components';
import { FaBriefcase } from 'react-icons/fa';
import Layout from './Layout';
import { H3, H4, H6, P2, Caption } from '../Typography';
import { useEffect, useState } from 'react';
  
const Jobs = () => {
  const [data, setData] = useState<JobCardProps[]>([]);


  useEffect(() => {
    fetch('http://localhost:3001/jobs')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  const openJobs = data.filter(item => item.status === 'Open').length;
  const activeJobs = data.filter(item => item.status === 'Active').length;
  const closedJobs = data.filter(item => item.status === 'Closed').length;
  
    return (
      <Layout>
      <div className='grid grid-cols-3 gap-4 p-8 bg-slate-200'>
        <KPI title='Open' count={openJobs} />
        <KPI title='Active' count={activeJobs} />
        <KPI title='Closed' count={closedJobs} />
      </div>
      <div className='grid grid-cols-3 gap-4 m-8'>
        {data.map(item => (
          <JobCard key={item.id} {...item} />
        ))}
      </div>
      </Layout>
    );
  };

  export default Jobs;
  
  interface KPIProps {
    title: string;
    count: number;
  }
  
  const KPI = ({ title, count }: KPIProps) => {
    return (
      <Paper>
        <div className='flex flex-row justify-between items-center'>
          <H4>{title}</H4>
          <P2>{count}</P2>
        </div>
      </Paper>
    )
  }
  
  interface JobCardProps {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    jobtype: string;
    lastActivity: string;
    Shortlist: number;
    CVSent: number;
    Interview: number;
    Offer: number;
    Placement: number;
    status: string;
  }
  
  const JobCard = ({
    title,
    company,
    location,
    salary,
    jobtype,
    lastActivity,
    Shortlist,
    CVSent,
    Interview,
    Offer,
    Placement,
  }: JobCardProps) => {
    return (
      <Paper>
        <div className='flex justify-between'>
          <FaBriefcase size={32} color={'#C0C1C9'} />
          </div>
          <div className='flex flex-col gap-2'>
          <H4>{title}</H4>
          <H6>{company}</H6>
          </div>
          <div className='flex justify-between'>
          <Breadcrumbs items={[location, salary, jobtype]} />
          <Caption>{lastActivity}</Caption>
          </div>
          <div className='flex justify-between bg-white rounded-sm border border-gray-200 p-4'>
          <div className='flex flex-col gap-1'>
          <Caption>Shortlist</Caption>
          <H3>{Shortlist}</H3>
          </div>
          <div className='flex flex-col gap-1'>
          <Caption>CV Sent</Caption>
          <H3>{CVSent}</H3>
          </div>
          <div className='flex flex-col gap-1'>
          <Caption>Interview</Caption>
          <H3>{Interview}</H3>
          </div>
          <div className='flex flex-col gap-1'>
          <Caption>Offer</Caption>
          <H3>{Offer}</H3>
          </div>
          <div className='flex flex-col gap-1'>
          <Caption>Placement</Caption>
          <H3>{Placement}</H3>
          </div>
          </div>
      </Paper>
    )
  }