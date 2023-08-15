import { Table } from '../Components';
import { Layout } from '../Pages';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { H2 } from '../Typography';

interface Candidate {
  id: string;
  name: string;
  reviewDate: string;
  responsibleAgent: string; // updated to string as it'll hold names now
  addedBy: string;          // updated to string as it'll hold names now
  reviewStatus: string;
}

const Candidates = () => {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch candidates
    fetch('http://localhost:3001/candidates')
    .then((res) => res.json())
    .then((candidateData) => {
      // Fetch users
      fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((users) => {
        // Map through candidates and replace ID with user names
        const updatedCandidates = candidateData.map(candidate => ({
          ...candidate,
          responsibleAgent: users.find(user => user.userID === candidate.responsibleAgent)?.userName || 'Unknown',
          addedBy: users.find(user => user.userID === candidate.addedBy)?.userName || 'Unknown'
        }));
        
        setCandidateData(updatedCandidates);
      });
    });
  }, []);

  const handleRowClick = (candidateID: string) => {
    console.log("Row clicked with candidate ID:", candidateID);
    navigate(`/candidates/${candidateID}`);
}

  return (
    <Layout>
      <H2>Candidates</H2>
      <Table
        data={candidateData}
        headers={['Name', 'Review Date', 'Responsible Agent', 'Added By', 'Review Status']}
        keys={['name', 'reviewDate', 'responsibleAgent', 'addedBy', 'reviewStatus']}
        onRowClick={handleRowClick}
      />
    </Layout>
  );
};

export default Candidates;