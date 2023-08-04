import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaBriefcase, FaUser, FaBuilding, FaIndustry } from 'react-icons/fa';
import { useState } from 'react';
import { H1, H2, H3, H4, H5, H6, P, P2, P3, Caption } from './Typography';

function App() {
  return (
    <Router>
      <div className='bg-slate-100 h-screen flex flex-col'>
        <Header />
        <div className='flex-1 flex flex-row justify-center'>
          <SideBar />
          <div className='flex-1 flex flex-col'>
            <Routes>
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/organisations" element={<Organisations />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App

function Header() {
  return (
    <div className=' bg-slate-200 flex-0 flex items-center justify-between h-12 px-5'>
      <div className='h-10 bg-slate-500 w-40 rounded-lg'></div>
      <Search placeholder='Search...' />
      <div className='flex items-center justify-between gap-2'>
        <Button size='medium' color='primary' onClick={() => console.log('Login')}>Login</Button>
        <Button size='medium' color='secondary' onClick={() => console.log('Sign Out')}>Sign Out</Button>
    </div>
    </div>
  )
}


function SideBar() {
  const [selected, setSelected] = useState<string>('');

  const handleLinkClick = (page: string) => {
    setSelected(page);
  };

  return (
    <div className='bg-slate-300 h-full w-12 flex flex-col items-center py-5 gap-5'>
        <Link to="/jobs" className="my-2" onClick={() => handleLinkClick('jobs')}>
          <FaBriefcase size={24} color={selected === 'jobs' ? 'blue' : 'black'} />
        </Link>
        <Link to="/candidates" className="my-2" onClick={() => handleLinkClick('candidates')}>
          <FaUser size={24} color={selected === 'candidates' ? 'blue' : 'black'} />
        </Link>
        <Link to="/clients" className="my-2" onClick={() => handleLinkClick('clients')}>
          <FaBuilding size={24} color={selected === 'clients' ? 'blue' : 'black'} />
        </Link>
        <Link to="/organisations" className="my-2" onClick={() => handleLinkClick('organisations')}>
          <FaIndustry size={24} color={selected === 'organisations' ? 'blue' : 'black'} />
        </Link>
    </div>
  )
}

interface SearchProps {
  placeholder?: string;
}

function Search({ placeholder }: SearchProps) {

  return (
    <div className='flex-1 flex items-center justify-center'>
      <Input placeholder={placeholder} />
    </div>
  )
}

import PropTypes from 'prop-types';

const Button = ({
  children,
  size = 'medium',
  onClick,
  color = 'blue',
  disabled = false,
}) => {
  // Define size classes
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  };

  // Define color classes
  const colorClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
    secondary: 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600',
    tertiary: 'bg-blue-300 hover:bg-blue-400 active:bg-blue-500',
  };

  // Combine classes
  const classes = `
    ${sizeClasses[size]}
    ${colorClasses[color]}
    border-2 border-white
    rounded-sm
    text-white font-medium
    transition duration-300 ease-in-out
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['blue', 'red', 'green']),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  size: 'medium',
  color: 'blue',
  disabled: false,
};

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function Input({
  placeholder,
  value,
  onChange
}: InputProps) {

  return (
    <input 
      className='rounded-lg px-2 py-1 w-5/12'
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
    />
  )
}

interface PaperProps {
  children?: React.ReactNode;
}

const Paper = ({ children }: PaperProps) => {
  return (
    <div className='flex flex-col bg-white rounded-sm border border-gray-200 p-4 gap-3'>
      {children}
    </div>
  )
}

const Jobs = () => {

  const items = [
    {
      id: '1',
      title: 'Job 1',
      description: 'Job 1 description',
    },
    {
      id: '2',
      title: 'Job 2',
      description: 'Job 2 description',
    },
    {
      id: '3',
      title: 'Job 3',
      description: 'Job 3 description',
    }
  ]

  return (
    <>
      <div className='flex flex-row justify-between items-center'>
        <H1>Jobs</H1>
        <Button children='Add Job' />
      </div>
      <div className='flex flex-row gap-4 m-8'>
        <div className='flex-1'>
          {items.map(item => (
            <JobCard key={item.id} title={item.title} description={item.description} />
          ))}
        </div>
      </div>
    </>
  );
};

interface JobCardProps {
  title: string;
  description: string;
}

const JobCard = ({ title, description }: JobCardProps) => {
  return (
    <Paper>
      <div className='flex flex-row items-center gap-4'>
        <div className='h-10 w-10 bg-slate-500 rounded-lg'></div>
        <div className='flex flex-col'>
          <H4>{title}</H4>
          <Caption>{description}</Caption>
        </div>
      </div>
    </Paper>
  );
};


function Candidates() {

  const handleClick = () => {
    console.log('Button clicked');
  }

  return (
    <>
      <Button color='tertiary'onClick={handleClick}>Default Button</Button>
      <Button color="primary" onClick={handleClick}>Red Button</Button>
      <Button size="large" color="secondary" onClick={handleClick}>Large Green Button</Button>
      <Button size="small" color='primary' disabled onClick={handleClick}>Disabled Button</Button>
    </>
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
      <div className='flex flex-row gap-4 m-8'>
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

const Organisations = () => {
  return (
    <>
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
      <Pill text='New' />
      <P>{description}</P>
     <BreadCrumb items={['New York', 'Permanent', 'GBP £60k pa base', 'PAYG']} />
    </Paper>
  )
}

interface PillProps {
    text: string;
}

const Pill = ({ text }: PillProps) => {
  
  return (
    <div className="bg-slate-200 rounded-full px-2 py-1 inline-block">
      <p className="text-black text-sm">
        {text} 
      </p>
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

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='p-2 w-full'>
      {children}
    </div>
  )
}

const TableHeader = () => {

  const headers = ['Job Title', 'Company', 'Location', 'Experience Required', 'Skills']

  return (
    <div className='flex flex-row border-b border-gray-200 bg-slate-50 px-6 py-2'>
      {headers.map((header, index) => (
        <TableCell key={index}>
          {header}
        </TableCell>
      ))}
    </div>
  )
}

const TableRow = ({ row }: { row: string[] }) => {
  return (
    <div className='flex flex-row border-b border-gray-200'>
      {row.map((cell, index) => (
        <TableCell key={index}>
          {cell}
        </TableCell>
      ))}
    </div>
  )
}

const TableFooter = ({ page, setPage, maxPage }: { page: number, setPage: (page: number) => void, maxPage: number }) => {
  return (
    <div className='flex flex-row justify-center space-x-4 p-4'>
      <button disabled={page <= 0} onClick={() => setPage(page - 1)}>Prev</button>
      <span>Page {page + 1} of {maxPage + 1}</span>
      <button disabled={page >= maxPage} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  )
}

const TableBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex-1 overflow-auto p-6'>
      {children}
    </div>
  )
}


const Table = () => {
  const rows = {
          row1: ['Software Engineer','Google','Mountain View, CA','5 Years','React, Node, TypeScript'],
          row2: ['Data Scientist','Facebook','Menlo Park, CA','3 Years','Python, R, SQL'],
          row3: ['Product Manager','Amazon','Seattle, WA','7 Years','Agile, Communication, SQL'],
          row4: ['Software Engineer','Microsoft','Redmond, WA','4 Years','C#, .NET, Azure'],
          row5: ['Solutions Architect','Salesforce','San Francisco, CA','6 Years','APIs, Integration, Cloud'], 
          row6: ['DevOps Engineer','Netflix','Los Gatos, CA','2 Years','AWS, Jenkins, Docker'],
          row7: ['Data Analyst','Apple','Cupertino, CA','1 Year','SQL, Tableau, Statistics'],
          row8: ['Security Engineer','Palo Alto Networks','Santa Clara, CA','5 Years','Networking, Firewalls, OS'],
          row9: ['Front End Developer','Airbnb','San Francisco, CA','3 Years','JavaScript, React, CSS'],
          row10: ['Backend Developer','Uber','San Francisco, CA','4 Years','Java, Spring Boot, MySQL'],
          row11: ['Machine Learning Engineer','NVIDIA','Santa Clara, CA','2 Years','Python, PyTorch, CUDA'],
          row12: ['Systems Engineer','Cisco','San Jose, CA','6 Years','Linux, Networking, Virtualization'],
          row13: ['Database Administrator','Oracle','Redwood City, CA','8 Years','Oracle, SQL, PL/SQL'], 
          row14: ['Technical Writer','Adobe','San Jose, CA','5 Years','Documentation, User Guides, APIs'],
          row15: ['Solutions Consultant','ServiceNow','Santa Clara, CA','3 Years','ITSM, ITIL, Customer Service'],
          row16: ['IT Project Manager','Intel','Santa Clara, CA','10 Years','PMP, Agile, Leadership'],
          row17: ['Network Engineer','Juniper','Sunnyvale, CA','7 Years','Routing, Switching, Firewalls'],
          row18: ['Technical Support','Apple','Cupertino, CA','2 Years','Troubleshooting, Customer Service'],
          row19: ['Cloud Architect','AWS','Seattle, WA','8 Years','EC2, S3, VPC, IAM'],
          row20: ['Security Analyst','Palo Alto Networks','Santa Clara, CA','4 Years','SIEM, SOC, Incident Response']
  }

  const [page, setPage] = useState(0);
  
  const rowsPerPage = 10;

  const displayedRows = Object.values(rows).slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <div className='flex flex-1 flex-col gap-2 bg-white rounded-md shadow-md m-8'>
      <TableHeader />
      <TableBody>
      {displayedRows.map((row, index) => (
        <TableRow key={index} row={row} />
      ))}
      </TableBody>
      <TableFooter page={page} setPage={setPage} maxPage={Math.ceil(Object.values(rows).length / rowsPerPage) - 1} />
    </div>
  )
}
















