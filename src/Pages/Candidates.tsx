import { Table, SelectField, Button, Modal, Input } from '../Components';
import { Layout } from '.';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { H2, H4 } from '../Typography';

interface Candidate {
  candidateID: string;
  name: string;
  reviewDate: string;
  responsibleAgent: string;
  addedBy: string;
  reviewStatus: string;
}

const Candidates = () => {

  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [responsibleAgentFilter, setResponsibleAgentFilter] = useState<string | null>(null);
  const [addedByFilter, setAddedByFilter] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/candidates').then(res => res.json()),
      fetch('http://localhost:3001/users').then(res => res.json())
    ])
    .then(([candidates, users]) => {
      const updatedCandidates = candidates.map(candidate => ({
        ...candidate,
        responsibleAgent: users.find(user => user.userID === candidate.responsibleAgent)?.userName || 'Unknown',
        addedBy: users.find(user => user.userID === candidate.addedBy)?.userName || 'Unknown'
      }));
      setCandidateData(updatedCandidates);
    });
  }, []);

  const handleStatusSelect = (option: string) => {
    setStatusFilter(option === "All" ? null : option);
  };

  const handleResponsibleAgentSelect = (option: string) => {
    setResponsibleAgentFilter(option === "All" ? null : option);
  };

  const handleAddedBySelect = (option: string) => {
    setAddedByFilter(option === "All" ? null : option);
  };

  const handleRowClick = (row: any) => {
    navigate(`/candidates/${row.candidateID}`);
  };  

  const filteredData = candidateData.filter(candidate => 
    (!statusFilter || candidate.reviewStatus === statusFilter) &&
    (!responsibleAgentFilter || candidate.responsibleAgent === responsibleAgentFilter) &&
    (!addedByFilter || candidate.addedBy === addedByFilter)
  );
  
  const [ showModal, setShowModal ] = useState(false);

  const handleAddCandidate = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddNewCandidate = (newCandidate: any) => {
    setCandidateData(prevData => [...prevData, newCandidate]);
    setShowModal(false);
  };

  console.log(candidateData);

  console.log(candidateData.map(candidate => candidate.reviewStatus));
  console.log([...new Set(candidateData.map(candidate => candidate.reviewStatus))]);
  console.log([...new Set(candidateData.map(candidate => candidate.responsibleAgent))]);

  return (
    <Layout>
      <div className="flex justify-between mb-2">
        <H2>Candidates</H2>
        <Button variant='secondary' size='medium' onClick={handleAddCandidate}>Add Candidate</Button>
      </div>
      <div className="flex justify-between mb-2 gap-2 max-w-xl">
        <SelectField type='text' placeholder='Review Status' options={[...new Set(candidateData.map(candidate => candidate.reviewStatus))]} onSelect={handleStatusSelect} />
        <SelectField type='text' placeholder='Responsible Agent' options={[...new Set(candidateData.map(candidate => candidate.responsibleAgent))]} onSelect={handleResponsibleAgentSelect} />
        <SelectField type='text' placeholder='Added By' options={[...new Set(candidateData.map(candidate => candidate.addedBy))]} onSelect={handleAddedBySelect} />
      </div>
      <Table
        data={filteredData}
        headers={['Name', 'Review Date', 'Responsible Agent', 'Added By', 'Review Status']}
        keys={['name', 'reviewDate', 'responsibleAgent', 'addedBy', 'reviewStatus']}
        onRowClick={handleRowClick}
      />
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <CandidateForm onAddCandidate={handleAddNewCandidate} />
      </Modal>
    </Layout>
    

  );
}

export default Candidates;

const CandidateForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    reviewDate: '',
    responsibleAgent: '',
    addedBy: '',
    reviewStatus: ''
  });

  const [users, setUsers] = useState<string[]>([]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(data => {
      const userNames = data.map((user: any) => user.userName);
      setUsers(userNames);
    });
  }, []);
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    fetch('http://localhost:3001/candidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      setFormData({
        name: '',
        reviewDate: '',
        responsibleAgent: '',
        addedBy: '',
        reviewStatus: ''
      });
      setIsSubmitted(false);
    });
  };

  return (
    <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
      <H4>Add Candidate</H4>
      <Input type='text' 
        label='Candidate Name' 
        name='name' placeholder='Name' 
        value={formData.name} 
        onChange={handleChange} 
        errorMessage={isSubmitted && !formData.name ? 'Candidate Name is required' : undefined}
      />
      <Input type='date' 
        label='Review Date' 
        name='reviewDate' 
        placeholder='Review Date' 
        value={formData.reviewDate} 
        onChange={handleChange} 
        errorMessage={isSubmitted && !formData.reviewDate ? 'Review Date is required' : undefined}
      />
      <SelectField type='text' 
        label='Responsible Agent' 
        name='responsibleAgent' 
        placeholder='Responsible Agent' 
        value={formData.responsibleAgent}
        options={['All', ...users]}
        onSelect={handleChange}
        errorMessage={isSubmitted && !formData.responsibleAgent ? 'Responsible Agent is required' : undefined}
      />
      <SelectField type='text' 
        label='Added By' 
        name='addedBy' 
        placeholder='Added By'
        value={formData.addedBy}
        options={['All', ...users]}
        onSelect={handleChange}
        errorMessage={isSubmitted && !formData.addedBy ? 'Added By is required' : undefined}
      />
      <SelectField type='text' 
        label='Review Status' 
        name='reviewStatus' 
        placeholder='Review Status'
        value={formData.reviewStatus}
        options={[ 'Open', 'In Review', 'Closed']} 
        onSelect={handleChange}
        errorMessage={isSubmitted && !formData.reviewStatus ? 'Review Status is required' : undefined}
      />
      <Button type='submit' variant='primary' size='medium' onClick={() => {}}>Add Candidate</Button>
    </form>
  );
}




