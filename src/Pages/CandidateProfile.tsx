// CandidateProfile.tsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import { H4, P2 } from '../Typography'

interface RootState {
    candidates: Candidate[];
  }


interface Candidate {
    id: number;
    name: string;
    ReviewDate: string;
    ResponsibleAgent: string;
    AddedBy: string;
    ReviewStatus: string;
  }

const CandidateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const candidateId = Number(id);

  const candidates = useSelector((state: RootState) => state.candidates);
  const candidate = candidates.find((candidate) => candidate.id === candidateId);
  if (!candidate) return <div>No candidate found</div>;

  return (
    <Layout>
    <div className='bg-slate-200 p-6 m-3 rounded-sm flex gap-4 items-center'>
      <img src="https://via.placeholder.com/150" alt="placeholder" />
      <div className='flex flex-col gap-3 flex-1'>
      <H4>Candidate Profile</H4>
      <h1>{candidate.name}</h1>
      <H4>Review Date</H4>
      <h3>{candidate.ReviewDate}</h3>
      <P2>Responsible Agent</P2>
      <h3>{candidate.ResponsibleAgent}</h3>
      <P2>Added By</P2>
      <h3>{candidate.AddedBy}</h3>
      </div>
      <h3>{candidate.ReviewStatus}</h3>
    </div>
    </Layout>
  );
};

export default CandidateProfile;
    