import { Table } from '../Components';
import { Layout } from '../Pages';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrected to useNavigate

interface Candidate {
  id: string;
  name: string;
  ReviewDate: string;
  ResponsibleAgent: string;
  AddedBy: string;
  ReviewStatus: string;
}

const Candidates = () => {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const navigate = useNavigate(); // Corrected to useNavigate

  useEffect(() => {
    fetch('http://localhost:3001/candidates')
    .then((res) => res.json())
    .then((data) => setCandidateData(data));
  }
  , []);

  // Updated onRowClick function to navigate to the candidate profile using v6's navigate
  const handleRowClick = (id: string) => {
    navigate(`/candidate/${id}`);
  };

  return (
    <Layout>
          <Table
            data={candidateData}
            headers={['Name', 'Review Date', 'Responsible Agent', 'Added By', 'Review Status']}
            keys={['name', 'ReviewDate', 'ResponsibleAgent', 'AddedBy', 'ReviewStatus']}
            onRowClick={handleRowClick} // Updated the onRowClick prop
          />
    </Layout>
  );
};

export default Candidates;
