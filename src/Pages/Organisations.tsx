import { Table } from '../Components';
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

  const handleRowClick = (id: string) => {
    navigate(`/organisation/${id}`);
  };

  return (
    <Layout>
      <H2>Organisations</H2>
      <Table
        data={organisationData}
        headers={['Company Name', 'Industry', 'Last Client Contact']}
        keys={['companyName', 'industry', 'lastClientContact']}
        onRowClick={handleRowClick}
      />
    </Layout>
  );
}

export default Organisations;
  