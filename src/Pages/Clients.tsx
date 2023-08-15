
import { useEffect, useState } from 'react';
import { H2 } from '../Typography';
import { Layout } from '.';
import { Table } from '../Components';


const Clients = () => {

  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/clients')
    .then((res) => res.json())
    .then((clientData) => {
      fetch('http://localhost:3001/organisations')
       .then((res) => res.json())
       .then((organisations) => {
         const updatedClients = clientData.map(client => ({
           ...client,
           companyName: organisations.find(organisation => organisation.organisationID === client.company)?.companyName || 'Unknown'
         }));
         setClientData(updatedClients);
       });
    });
  }, []); 

  return (

    <Layout>
    <H2>Clients</H2>
    <Table
      data={clientData}
      headers={['Name', 'Company', 'Email', 'Phone',  'Industry', 'Location']}
      keys={['clientName', 'companyName', 'contactEmail',  'phoneNumber', 'industryCategory', 'location']}
      onRowClick={() => {}}
    />
    </Layout>

  );
};

export default Clients;

