import { useState } from 'react';
import { FaBriefcase, FaUser, FaBuilding, FaIndustry } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [selected, setSelected] = useState<string>('');
  
    const handleLinkClick = (page: string) => {
      setSelected(page);
    };
  
    return (
      <div className='bg-gradient-to-r from-cyan-200 to-cyan-50 border border-cyan-100 fixed top-0 left-0 h-screen m-0 flex shadow-lg flex-col items-center justify-start mt-12 pt-6'>
          <Link to="/jobs" className="my-2" onClick={() => handleLinkClick('jobs')}>
            <SideBarIcon icon={<FaBriefcase size={20} />} selected={selected === 'jobs'} onClick={() => handleLinkClick('jobs')} text='Jobs' />
          </Link>
          <Link to="/candidates" className="my-2" onClick={() => handleLinkClick('candidates')}>
            <SideBarIcon icon={<FaUser size={20} />} selected={selected === 'candidates'} onClick={() => handleLinkClick('candidates')} text='Candidates' />
          </Link>
          <Link to="/clients" className="my-2" onClick={() => handleLinkClick('clients')}>
            <SideBarIcon icon={<FaBuilding size={20} />} selected={selected === 'clients'} onClick={() => handleLinkClick('clients')} text='Clients' />
          </Link>
          <Link to="/organisations" className="my-2" onClick={() => handleLinkClick('organisations')}>
            <SideBarIcon icon={<FaIndustry size={20} />} selected={selected === 'organisations'} onClick={() => handleLinkClick('organisations')} text='Organisations' />
          </Link>
      </div>
    )
  }

  const SideBarIcon = ({ icon, selected, onClick }: any) => {
    return (
      <div
        className={`flex text-cyan-500 items-center justify-center h-12 w-12 cursor-pointer hover:bg-cyan-200 transition-all duration-200 ${
          selected && 'bg-cyan-100 text-cyan-300'
        }`}
        onClick={onClick}
      >
        {icon}

      </div>
    );
  }


export default SideBar;