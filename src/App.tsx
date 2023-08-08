
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { FaBriefcase , FaPhone , FaArrowDown , FaAngry } from 'react-icons/fa';
import { H1, H2, H3, H4, H6, P, P2, Caption } from './Typography';
import { Provider } from 'react-redux';
import store from './Pages/store';
import { Paper , TabBar , Breadcrumbs , FAB } from './Components';
import { Candidates , CandidateProfile , Layout } from './Pages';
import { SignIn , SignUp } from './Components/auth';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/candidates' element={<Candidates />} />
            <Route path='/candidate/:id' element={<CandidateProfile />} />
            <Route path='/organisations' element={<Organisations />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </Router>
    </Provider>
  );
}

export default App


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
    <Layout>
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
    </Layout>
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
}: JobCardProps) => {
  return (
    <Paper>
      <div className='flex justify-between'>
        <FaBriefcase size={32} color={'#3182CE'} />
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

const Clients = () => {

  const clientdata = [
    {
      id: 1,
      title: 'Software Engineer',
      status : 'Inactive',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'New York',
      JobType: 'Contract',
      salary: 'GBP £60k pa base',
      taxtype: 'PAYE',
    },
    {
      id: 2, 
      title: 'Manager',
      status : 'Open',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'San Francisco',
      JobType: 'Permanent',
      salary: 'GBP £70k pa base',
      taxtype: 'Self-assessment',
    },
    {
      id: 3,
      title: 'Scrum Master',
      status : 'Active',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'London',
      JobType: 'Internship',
      salary: 'GBP £80k pa base',
      taxtype: 'Limited Company',
    }
  ];

  return (
    <Layout>
      <ClientsCard />
      <div className='grid grid-cols-3 gap-4 m-8'>
        {clientdata.map(clientjobs => (
          <ActivityCard 
            key={clientjobs.id}
            title={clientjobs.title}
            status={clientjobs.status}
            description={clientjobs.description}
            location={clientjobs.location}
            salary={clientjobs.title}
            jobtype={clientjobs.title}
            taxtype={clientjobs.title}
          />
        ))}
      </div>
    </Layout>
  )
}

const ClientsCard = () => {
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
        <Breadcrumbs items={['New York', 'Permanent', 'GBP £60k pa base', 'PAYG']} theme='dark' />
        </div>
        <div className='flex flex-row gap-3'>
        <FAB icon={<FaAngry />} />
        <FAB icon={<FaPhone />} />
        <FAB icon={<FaArrowDown />} />
        </div>
        </div>
      <TabBar tabs={['Summary', 'Activity', 'Personal', 'Career', 'Documents', 'Internal']} theme='dark' />
    </div>
  )
}

interface ActivityCardProps {
  title: string;
  status: string;
  description: string;
  location: string;
  salary: string;
  jobtype: string;
  taxtype: string;
}


const ActivityCard: React.FC<ActivityCardProps> = ({title, status, description, salary, location, jobtype, taxtype}) => {

  return (
    <Paper>
      <H3>{title}</H3>
      <Pill variant={status} />
      <P>{description}</P>
      <Breadcrumbs items={[location, salary, jobtype, taxtype]} />
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



const Organisations = () => {
  return (
    <Layout>
      <OrganisationCard />
    </Layout>
  )
}

const OrganisationCard = () => {
  return (
    <Paper>
      <H3>Organisation Name</H3>
      <P>Company Name</P>
      <P>Company Address</P>
      <Breadcrumbs items={['New York', 'Permanent', 'GBP £60k pa base', 'PAYG']} />
    </Paper>
  )
}






















