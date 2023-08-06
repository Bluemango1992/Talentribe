import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { H1, H2, H3, H4, H6, P, P2, Caption } from './Typography';
import { Provider } from 'react-redux';
import store from './store';
import Candidates from './Candidates';
import { Paper , Button , Layout } from './Components';
import React from 'react';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/candidates' element={<Candidates />} />
            <Route path='/organisations' element={<Organisations />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col items-center'>
      <H1>Home</H1>
      <P2>Count: {count}</P2>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}

const Login = () => {
  return (
    <div className='flex flex-col items-center'>
      <H1>Login</H1>
    </div>
  );
}

const Register = () => {
  return (
    <div className='flex flex-col items-center'>
      <H1>Register</H1>
    </div>
  );
}

const NotFound = () => {
  return (
    <div className='flex flex-col items-center'>
      <H1>404</H1>
      <P2>Page not found</P2>
    </div>
  );
}

const data = [
  {
    id: '1',
    title: 'Finance Manager',
    company : 'Google',
    location: 'New York',
    salary: '£50,000',
    jobtype: 'Contract',
    lastActivity: '1 day ago',
    Shortlist: 10,
    CVSent: 12,
    Interview: 5,
    Offer: 2,
    Placement: 1,
    status: 'Open',
  },
  {
    id: '2',
    title: 'Software Engineer',
    company : 'IBM',
    location: 'London',
    salary: '£500,000',
    jobtype: 'Maternity cover',
    lastActivity: '1 day ago',
    Shortlist: 10,
    CVSent: 12,
    Interview: 5,
    Offer: 2,
    Placement: 1,
    status: 'Closed',
  },
  {
    id: '3',
    title: 'Manager',
    company : 'Facebook',
    location: 'Berlin',
    salary: '£150,000',
    jobtype: 'Permanent',
    lastActivity: '1 day ago',
    Shortlist: 10,
    CVSent: 12,
    Interview: 5,
    Offer: 2,
    Placement: 1,
    status: 'Active',
  },
  {
    id: '4',
    title: 'Manager',
    company : 'Facebook',
    location: 'Berlin',
    salary: '£150,000',
    jobtype: 'Permanent',
    lastActivity: '1 day ago',
    Shortlist: 10,
    CVSent: 12,
    Interview: 5,
    Offer: 2,
    Placement: 1,
    status: 'Active',
  },
]

const Jobs = () => {
  const openJobs = data.filter(job => job.status === 'Open').length;
  const activeJobs = data.filter(job => job.status === 'Active').length;
  const closedJobs = data.filter(job => job.status === 'Closed').length;

  return (
    <>
    <div className='grid grid-cols-3 gap-4 bg-slate-50 p-8 rounded-sm'>
      <KPI title='Open' count={openJobs} />
      <KPI title='Active' count={activeJobs} />
      <KPI title='Closed' count={closedJobs} />
    </div>
    <div className='grid grid-cols-3 gap-4 m-8'>
      {data.map(item => (
        <JobCard key={item.id} {...item} />
      ))}
    </div>
    </>
  );
};

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
  status,
}: JobCardProps) => {
  return (
    <Paper>
      <div className='flex justify-between'>
        <FaBriefcase size={32} color={'#3182CE'} />
        <Pill>{status}</Pill>
        </div>
        <div className='flex flex-col gap-2'>
        <H4>{title}</H4>
        <H6>{company}</H6>
        </div>
        <div className='flex justify-between'>
        <BreadCrumb items={[location, salary, jobtype]} />
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

const Clients = () => {

  const activities = [
    {
      id: 1,
      title: 'Activity 1', 
      description: 'First activity'
    },
    {
      id: 2, 
      title: 'Activity 2',
      description: 'Second activity'
    },
    {
      id: 3,
      title: 'Activity 3',
      description: 'Third activity'
    }
  ]

  return (
    <>
      <ClientsCard />
      <div className='flex flex-col-3'>
        {activities.map(activity => (
          <ActivityCard 
            key={activity.id}
            title={activity.title}
            description={activity.description} 
          />
        ))}
      </div>
    </>
  )

}

function ClientsCard() {
  return (
    <div className='from-slate-500 to-slate-600 bg-gradient-to-tl shadow-sm'>
      <div className='flex flex-row items-center gap-4 p-8'>
        <div className='w-32 h-32 rounded-full border border-gray-200 flex items-center justify-center'>
          <H1 theme='dark'>JD</H1>
        </div>
        <div className='flex flex-1 flex-col gap-2'>
        <H2 theme='dark'>Client Name</H2>
        <P theme='dark'>Company Name</P>
        <P theme='dark'>Company Address</P>
        <BreadCrumb items={['New York', 'Permanent', 'GBP £60k pa base', 'PAYG']} theme='dark' />
        </div>
        <div className='flex flex-row gap-3'>
        <FAB />
        <FAB />
        <FAB />
        </div>
        </div>
      <TabBar tabs={['Summary', 'Activity', 'Personal', 'Career', 'Documents', 'Internal']} theme='dark' />
    </div>
  )
}

interface ActivityCardProps {
  title: string;
  description: string;
}


const ActivityCard = ({title, description}: ActivityCardProps) => {
  return (
    <Paper>
      <H3>{title}</H3>
      <Pill>Hello</Pill>
      <P>{description}</P>
     <BreadCrumb items={['New York', 'Permanent', 'GBP £60k pa base', 'PAYG']} />
    </Paper>
  )
}

interface PillProps {
    children?: React.ReactNode;
}



const Organisations = () => {
  return (
    <>
      <Button theme='dark' variant='primary' onClick={() => {}}>
        Add Organisation
      </Button>

      <OrganisationCard />
    </>
  )
}

const OrganisationCard = () => {
  return (
    <Paper>
      <H3>Organisation Name</H3>
      <P>Company Name</P>
      <P>Company Address</P>
      <BreadCrumb items={['New York', 'Permanent', 'GBP £60k pa base', 'PAYG']} />
    </Paper>
  )
}




const Pill = ({ children }: PillProps) => {
  
  return (
    <div className="bg-slate-200 rounded-full px-3 py-1 text-sm font-semibold text-slate-800 flex justify-center items-center">
      <P theme='light'>{children}</P>
    </div>
  );
}

const FAB = () => {
  return (
    <div className='bg-white w-12 h-12 rounded-full'>  
    </div>
  )
}

interface BreadCrumbProps {
  items?: string[];
  theme?: 'light' | 'dark';
}

const BreadCrumb = ({
  items = ['tab 1', 'tab 2', 'tab 3'],
  theme = 'light'
}: BreadCrumbProps) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <div className={`flex gap-2 ${textColor}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <BreadCrumbItem title={item} />
          {index < items.length - 1 && <span>&#8226;</span>} 
        </React.Fragment>
      ))}
    </div>
  );
}

interface BreadCrumbItemProps {
  title: string;
}

function BreadCrumbItem({ title }: BreadCrumbItemProps) {
  return (
    <div className='text-bg-200'>
      {title}
    </div>
  )
}

interface TabBarProps {
  tabs: string[];
  theme: "light" | "dark";
}

function TabBar({ tabs, theme }: TabBarProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]); // Default to first tab
  const textColor = theme === "dark" ? 'text-white' : 'text-black';
  return (
    <div className={`flex gap-8 mx-8 ${textColor}`}>
      {tabs.map((tab, index) => (
        <TabItem 
          key={index} 
          title={tab} 
          isSelected={tab === selectedTab} 
          onSelect={() => setSelectedTab(tab)}
        />
      ))}
    </div>
  )
}

interface TabItemProps {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

function TabItem({ title, isSelected, onSelect }: TabItemProps) {
  return (
    <div 
      onClick={onSelect}
      className={`cursor-pointer p-1
       ${isSelected ? 'text-slate-400' : 'text-slate-200'}`}
    >
      {title}
    </div>
  )
}





















