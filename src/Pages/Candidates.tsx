// Candidates.tsx
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Table } from '../Components';
import { Layout } from '../Pages';
import CandidateProfile from './CandidateProfile';
import { useEffect } from 'react';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const candidateData = useSelector((state: RootState) => state.candidates);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/api/candidates');
        const data = await response.json();
        
        // Dispatch this data to your Redux store
        dispatch({ type: 'SET_CANDIDATES', payload: data });
      }
  
      fetchData();
    }, [dispatch]);

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

