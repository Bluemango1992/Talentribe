import { useState } from 'react';
import { FaBriefcase, FaUser, FaBuilding, FaIndustry } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [selected, setSelected] = useState<string>('');
  
    const handleLinkClick = (page: string) => {
      setSelected(page);
    };
  
    return (
      <div className='bg-cyan-900 fixed top-0 left-0 h-screen m-0 flex shadow-lg flex-col items-center justify-start mt-12 pt-6'>
          <Link to="/jobs" className="my-2" onClick={() => handleLinkClick('jobs')}>
            <SideBarIcon icon={<FaBriefcase size={24} />} selected={selected === 'jobs'} onClick={() => handleLinkClick('jobs')} text='Jobs' />
          </Link>
          <Link to="/candidates" className="my-2" onClick={() => handleLinkClick('candidates')}>
            <SideBarIcon icon={<FaUser size={24} />} selected={selected === 'candidates'} onClick={() => handleLinkClick('candidates')} text='Candidates' />
          </Link>
          <Link to="/clients" className="my-2" onClick={() => handleLinkClick('clients')}>
            <SideBarIcon icon={<FaBuilding size={24} />} selected={selected === 'clients'} onClick={() => handleLinkClick('clients')} text='Clients' />
          </Link>
          <Link to="/organisations" className="my-2" onClick={() => handleLinkClick('organisations')}>
            <SideBarIcon icon={<FaIndustry size={24} />} selected={selected === 'organisations'} onClick={() => handleLinkClick('organisations')} text='Organisations' />
          </Link>
      </div>
    )
  }

  const SideBarIcon = ({ icon, selected, onClick }: any) => {
    return (
      <div
        className={`flex text-white items-center justify-center h-12 w-12 cursor-pointer hover:bg-cyan-700 transition-all duration-200 ${
          selected && 'bg-cyan-700 text-cyan-300'
        }`}
        onClick={onClick}
      >
        {icon}

      </div>
    );
  }


export default SideBar;