import { useEffect, useState } from 'react';
import { Layout } from '.';
import { H3, H4, P } from '../Typography';
import { useParams } from 'react-router-dom';


const CandidatesProfile = () => {
    const { id } = useParams<{ id: string }>(); // Get the id from the URL
    const [candidateData, setCandidateData] = useState<Candidate | null>(null); // Set the initial state to null
      
    useEffect(() => {
      fetch(`http://localhost:3001/candidates/${id}`) // Fetch the candidate with the id from the URL
        .then((res) => res.json())
        .then((data) => setCandidateData(data));
    }, [id]);
  
    if (!candidateData) return null; // Return null if candidateData is null
  
    return (
      <Layout>
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex flex-row justify-between items-center'>
            <H3>Candidate Profile</H3>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between items-center'>
              <H4>{candidateData.name}</H4>
            </div>
            <P>Review Date: {candidateData.ReviewDate}</P>
            <P>Responsible Agent: {candidateData.ResponsibleAgent}</P>
            <P>Added By: {candidateData.AddedBy}</P>
            <P>Review Status: {candidateData.ReviewStatus}</P>
          </div>
        </div>
      </Layout>
    );
  }
  
  export default CandidatesProfile;
  