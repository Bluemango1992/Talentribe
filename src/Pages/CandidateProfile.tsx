// CandidateProfile.tsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Paper } from '../Components';

interface Candidate {
    id: string;
    name: string;
    ReviewDate: string;
    ResponsibleAgent: string;
    AddedBy: string;
    ReviewStatus: string;
  }

const CandidateProfile = () => {
  const { id } = useParams();
  const candidateData = useSelector((state: any) => state.candidates);
  const candidate = candidateData.find((c: Candidate) => c.id === id);

  if (!candidate) return <div>No candidate found</div>;

  return (
    <Paper>
      <h1>{candidate.name}</h1>
      <h3>{candidate.ReviewDate}</h3>
      <h3>{candidate.ResponsibleAgent}</h3>
      <h3>{candidate.AddedBy}</h3>
      <h3>{candidate.ReviewStatus}</h3>
    </Paper>
  );
};

export default CandidateProfile;
    