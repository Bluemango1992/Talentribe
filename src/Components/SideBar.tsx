import { useState } from 'react';
import { FaBriefcase, FaUser, FaBuilding, FaIndustry } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [selected, setSelected] = useState<string>('');
  
    const handleLinkClick = (page: string) => {
      setSelected(page);
    };
  
    return (
      <div className='bg-slate-300 h-full w-12 flex flex-col items-center py-5 gap-5'>
          <Link to="/jobs" className="my-2" onClick={() => handleLinkClick('jobs')}>
            <FaBriefcase size={24} color={selected === 'jobs' ? '#788475' : '#5e5d5c'} />
          </Link>
          <Link to="/candidates" className="my-2" onClick={() => handleLinkClick('candidates')}>
            <FaUser size={24} color={selected === 'candidates' ? '#788475' : '#5e5d5c'} />
          </Link>
          <Link to="/clients" className="my-2" onClick={() => handleLinkClick('clients')}>
            <FaBuilding size={24} color={selected === 'clients' ? '#788475' : '#5e5d5c'} />
          </Link>
          <Link to="/organisations" className="my-2" onClick={() => handleLinkClick('organisations')}>
            <FaIndustry size={24} color={selected === 'organisations' ? '#788475' : '#5e5d5c'} />
          </Link>
      </div>
    )
  }

export default SideBar;