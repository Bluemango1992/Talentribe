import { Dropdown, Table, Input, Button } from '../Components';
import { Layout } from '../Pages';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { H2, H4 } from '../Typography';
import { FaWindowClose } from 'react-icons/fa';



interface Organisations {
  companyName: string;
  industry: string;
  lastClientContact: string;
}


const Organisations = () => {

  const [organisationData, setOrganisationData] = useState<Organisations[]>([]);
  const navigate = useNavigate();

  const [companyFilter, setCompanyFilter] = useState<string | null>(null);
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [contactFilter, setContactFilter] = useState<string | null>(null);

  useEffect(() => {
    // Fetch organisations
    fetch('http://localhost:3001/organisations')
    .then((res) => res.json())
    .then((organisationData) => {
      // Fetch users
      fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((users) => {
        // Map through organisations and replace ID with user names
        const updatedOrganisations = organisationData.map(organisation => ({
          ...organisation,
          lastClientContact: users.find(user => user.userID === organisation.lastClientContact)?.userName || 'Unknown'
        }));
        
        setOrganisationData(updatedOrganisations);
      });
    });
  }, []);

  const handleRowClick = (row: any) => {
    navigate(`/organisations/${row.organisationID}`);
};

  const handleCompanySelect = (option: string) => {
      setCompanyFilter(option === "All" ? null : option);
  };

  const handleIndustrySelect = (option: string) => {
      setIndustryFilter(option === "All" ? null : option);
  };

  const filteredData = organisationData
  .filter(org => !companyFilter || org.companyName.includes(companyFilter))
  .filter(org => !industryFilter || org.industry === industryFilter)
  .filter(org => !contactFilter || org.lastClientContact.startsWith(contactFilter));

  const handleAddNewOrganisation = (newOrganisation: any) => {
    // Logic to add the new organisation to your data (e.g., API call)
    // For now, we'll just add it to the local state:
    setOrganisationData(prevData => [...prevData, newOrganisation]);
    setIsModalOpen(false);
  };

  const [isAddOrganisationOpen, setIsModalOpen] = useState(false);

  const handleAddOrganisation = () => {
    setIsModalOpen(true);
  };

  const handleCloseAddOrganisation = () => {
    setIsModalOpen(false);
  };


  return (
    <Layout>
      <div className="flex justify-between mb-2">
      <H2>Organisations</H2>
      <Button onClick={handleAddOrganisation} variant='secondary' size='medium'>Add Organisation</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4 w-1/3">
      <Dropdown type='text' placeholder='Company' options={['All', ...new Set(organisationData.map(org => org.companyName))]} onSelect={handleCompanySelect} />
      <Dropdown type='text' placeholder='Industry' options={['All', ...new Set(organisationData.map(org => org.industry))]} onSelect={handleIndustrySelect} />
      </div>
      <Table
        data={filteredData}
        headers={['Company Name', 'Industry', 'Last Client Contact']}
        keys={['companyName', 'industry', 'lastClientContact']}
        onRowClick={handleRowClick}
      />
      <Model isOpen={isAddOrganisationOpen} onClose={handleCloseAddOrganisation}>
        <OrganisationForm onSubmit={handleAddNewOrganisation} />
      </Model>
    </Layout>
  );
}

export default Organisations;


const Model = ({isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-600 bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col items-end bg-white rounded-lg p-4 relative">
      <button className="ml-2" onClick={onClose}>
          <FaWindowClose size={24} />
        </button>
        {/* Modal Content */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
  

const OrganisationForm = ({ onSubmit }: any) => {
  
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    lastClientContact: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96'>
        <H4>Add Organisation</H4>
      <Input name='companyName' type='text' placeholder="HSBS, Lloyds TSB ..." label="Company Name" value={formData.companyName} onChange={handleChange} />
      <Input name='industry' type='text' placeholder="Tech, Finance, Healthcare ..." label="Industry" value={formData.industry} onChange={handleChange} />
      <button className='bg-slate-800 text-white py-2 px-1 font-semibold rounded-md hover:bg-slate-700' type="submit">Add Organisation</button>
      </form>
  );
};




  