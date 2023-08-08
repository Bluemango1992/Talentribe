// Candidates.tsx
import { useSelector } from 'react-redux';
import { useNavigate , Routes, Route } from 'react-router-dom';
import { Table } from '../Components';
import { Layout } from '../Pages';
import CandidateProfile from './CandidateProfile';

interface RootState {
    candidates: Candidate[];
  }
  
  interface Candidate {
    id: string;
    name: string;
    ReviewDate: string;
    ResponsibleAgent: string;
    AddedBy: string;
    ReviewStatus: string;
  }
  

const Candidates = () => {
  const navigate = useNavigate();
  const candidateData = useSelector((state: RootState) => state.candidates);

  const handleRowClick = (row: Candidate) => {
    navigate(`/candidate/${row.id}`);
  };  

  return (
    <Layout>
    <Routes>
      <Route path="/candidate/:id" element={<CandidateProfile />} />
      <Route path="/" element={
        <Table 
          data={candidateData} 
          headers={['Name', 'Review Date', 'Responsible Agent', 'Added By', 'Review Status']}
          keys={['name', 'ReviewDate', 'ResponsibleAgent', 'AddedBy', 'ReviewStatus']}
          onRowClick={handleRowClick}
        />} 
      />
    </Routes>
    </Layout>
  );
};

export default Candidates;
