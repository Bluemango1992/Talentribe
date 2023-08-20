import { Dropdown, Table, Input, Button, SelectField } from '../Components';
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
  const [contactFilter] = useState<string | null>(null);

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
        <SelectField type='text' placeholder='Company' options={['All', ...new Set(organisationData.map(org => org.companyName))]} onSelect={handleCompanySelect} />
        <SelectField type='text' placeholder='Industry' options={['All', ...new Set(organisationData.map(org => org.industry))]} onSelect={handleIndustrySelect} />
          </div>
          {filteredData.length === 0 ? (
            <div className="text-center h-full">No organisations found.</div>
            ) : (
                <Table
                  data={filteredData}
                  headers={['Company Name', 'Industry', 'Last Client Contact']}
                  keys={['companyName', 'industry', 'lastClientContact']}
                  onRowClick={handleRowClick}
                />
            )}
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
  

const OrganisationForm = () => {
  
  const [formData, setFormData] = useState<{
    companyName: string;
    industry: string;
    location?: string;
    website?: string;
    }>({
    companyName: "",
    industry: "",
    location: "",
    website: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (formData.companyName && formData.industry && formData.location && formData.website) {
        // POST the formData to the backend
        fetch('http://localhost:3001/organisations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from your backend
            // For example, if the backend sends a confirmation message:
            console.log(data.message);
            
            // If you want to clear the form after a successful submission:
            setFormData({
                companyName: "",
                industry: "",
                location: "",
                website: "",
            });
            setIsSubmitted(false);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
};

  return (
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96'>
        <H4>Add Organisation</H4>
      <Input 
        name='companyName' 
        type='text' 
        placeholder="HSBC, Lloyds TSB ..." 
        label="Company Name" 
        errorMessage={isSubmitted && !formData.companyName ? 'Please fill in field' : undefined}
        value={formData.companyName} 
        onChange={handleChange} 
      />
      <Input 
        name='industry' 
        type='text' 
        placeholder="Tech, Finance, Healthcare ..." 
        label="Industry" 
        errorMessage={isSubmitted && !formData.industry ? 'Please fill in field' : undefined}
        value={formData.industry} 
        onChange={handleChange} 
      />
      <Input
        name='location'
        type='text'
        placeholder="London, Manchester, New York ..."
        label="Location"
        errorMessage={isSubmitted && !formData.location ? 'Please fill in field' : undefined}
        value={formData.location}
        onChange={handleChange}
      />
      <Input
        name='website'
        type='text'
        placeholder="www.hsbc.com"
        label="Website"
        errorMessage={isSubmitted && !formData.website ? 'Please fill in field' : undefined}
        value={formData.website}
        onChange={handleChange}
      />
      <Button type='submit' variant='primary' size='medium' onClick={handleSubmit}>Add Organisation</Button>
      </form>
  );
};






  