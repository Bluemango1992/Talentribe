import { Dropdown, Table } from '../Components';
import { Layout } from '../Pages';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { H2 } from '../Typography';



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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

  const handleAddOrganisation = () => {
    setIsModalOpen(true);
  };

  console.log(handleAddOrganisation);

  const handleRowClick = (id: string) => {
    navigate(`/organisation/${id}`);
  };

  const handleCompanySelect = (option: string) => {
      setCompanyFilter(option === "All" ? null : option);
  };

  const handleIndustrySelect = (option: string) => {
      setIndustryFilter(option === "All" ? null : option);
  };

  const handleContactSelect = (option: string) => {
      setContactFilter(option === "All" ? null : option);
  };

  const filteredData = organisationData
  .filter(org => !companyFilter || org.companyName.includes(companyFilter))
  .filter(org => !industryFilter || org.industry === industryFilter)
  .filter(org => !contactFilter || org.lastClientContact.startsWith(contactFilter));


  return (
    <Layout>
      <div className="flex justify-between mb-2">
      <H2>Organisations</H2>
      <button className="btn btn-primary" onClick={() => handleAddOrganisation()}>Add Organisation</button>
      </div>
      <div className="flex justify-start gap-4 px-4 py-1 bg-white">
      <Dropdown placeholder='Company' options={organisationData.map(org => org.companyName)} onSelect={handleCompanySelect} />
      <Dropdown placeholder='Industry' options={['All', ...new Set(organisationData.map(org => org.industry))]} onSelect={handleIndustrySelect} />
      <Dropdown placeholder='Last Client Contact' options={['All', ...new Set(organisationData.map(org => org.lastClientContact))]} onSelect={handleContactSelect} />
      </div>
      <Table
        data={filteredData}
        headers={['Company Name', 'Industry', 'Last Client Contact']}
        keys={['companyName', 'industry', 'lastClientContact']}
        onRowClick={handleRowClick}
      />
    </Layout>
  );
}

export default Organisations;
  