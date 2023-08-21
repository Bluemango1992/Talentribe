
import { Table, SelectField, Button, Modal, Input } from '../Components';
import { Layout } from '.';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { H2, H4 } from '../Typography';

interface Job {
  title: string;
  location: string;
  salaryRange: string;
  jobType: string;
  companyName: string;
}

const Jobs = () => {

  const [jobData, setJobData] = useState<Job[]>([]);
  const [organisationData, setOrganisationData] = useState<any | null>(null);
  const navigate = useNavigate();

  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [jobTypeFilter, setJobTypeFilter] = useState<string | null>(null);
  const [companyFilter, setCompanyFilter] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/jobs').then(res => res.json()),
      fetch('http://localhost:3001/organisations').then(res => res.json())
    ])
    .then(([jobs, organisations]) => {
      const updatedJobs = jobs.map(job => ({
        ...job,
        companyName: organisations.find(org => org.organisationID === job.organisationID)?.companyName || 'Unknown'
      }));
      setJobData(updatedJobs);
      setOrganisationData(organisations);
    });
  }, []);

  const handleLocationSelect = (option: string) => {
    setLocationFilter(option === "All" ? null : option);
  };

  const handleJobTypeSelect = (option: string) => {
    setJobTypeFilter(option === "All" ? null : option);
  };

  const handleCompanySelect = (option: string) => {
    setCompanyFilter(option === "All" ? null : option);
  };


  const filteredData = jobData
  .filter(job => !locationFilter || job.location.startsWith(locationFilter))
  .filter(job => !jobTypeFilter || job.jobType === jobTypeFilter)
  .filter(job => !companyFilter || job.companyName.includes(companyFilter));

  const handleRowClick = (row: any) => {
    navigate(`/jobs/${row.jobID}`);
  };

  const [isAddJobOpen, setIsAddJobOpen] = useState(false);

  const handleAddJob = () => {
    setIsAddJobOpen(true);
  };

  const handleCloseAddJob = () => {
    setIsAddJobOpen(false);
  };

  const handleAddNewJob = (newJob: any) => {
    setJobData(prevData => [...prevData, newJob]);
    setIsAddJobOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-between mb-2">
        <H2>Jobs</H2>
        <Button variant='secondary' size='medium' onClick={() => handleAddJob(
      )}>Add Job</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4 w-1/3">
        <SelectField type='text' placeholder='Location' options={['All', ...new Set(jobData.map(job => job.location))]} onSelect={handleLocationSelect} />
        <SelectField type='text' placeholder='Job Type' options={['All', ...new Set(jobData.map(job => job.jobType))]} onSelect={handleJobTypeSelect} />
        <SelectField type='text' placeholder='Company' options={['All', ...new Set(jobData.map(job => job.companyName))]} onSelect={handleCompanySelect} />
      </div>
      <Table
        data={filteredData}
        headers={['Title', 'Location', 'Salary Range', 'Job Type', 'Company Name']}
        keys={['title', 'location', 'salaryRange', 'jobType', 'companyName']}
        onRowClick={handleRowClick}
      />
      <Modal
        title='Add Job'
        isOpen={isAddJobOpen}
        onClose={handleCloseAddJob}
      >
        <JobForm onAddJob={handleAddNewJob} organisationData={organisationData} />
      </Modal>
    </Layout>
  );
}

export default Jobs;

const JobForm = ({ onAddJob, organisationData }: any) => {
  
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobType, setJobType] = useState('');
  const [organisationID, setOrganisationID] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);  // New state variable to track if form has been submitted

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);  // Set formSubmitted to true when the form is attempted to be submitted
    if (title && location && salaryRange && jobType && organisationID) {
      const newJob = {
        title,
        location,
        salaryRange,
        jobType,
        organisationID
      };
      fetch('http://localhost:3001/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
      })
      .then(res => res.json())
      .then(data => {
        onAddJob(data);
      });
      setFormSubmitted(false);  // Set formSubmitted back to false when the form has been submitted
    }
  };

  const handleCompanySelect = (option: string) => {
    const organisation = organisationData.find(org => org.companyName === option);
    if (organisation) {
      setOrganisationID(organisation.organisationID);
    }
  };

  return (
    <form className='flex flex-col gap-4 w-96' onSubmit={handleSubmit}>
      <H4>Add Job</H4>
        <Input type="text" label='Job title' errorMessage={formSubmitted && !title ? 'Field is required' : ''} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Job title' />
        <Input type="text" label='Location' errorMessage={formSubmitted && !location ? 'Field is required' : ''} value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
        <Input type="text" label='Salary Range' errorMessage={formSubmitted && !salaryRange ? 'Field is required' : ''} value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder='Salary Range' />
        <Input type="text" label='Job Type' errorMessage={formSubmitted && !jobType ? 'Field is required' : ''} value={jobType} onChange={(e) => setJobType(e.target.value)} placeholder='Job Type' />
        <SelectField type='text' label='Assign an organisation' placeholder='Company' options={['All', ...new Set(organisationData.map((org: any) => org.companyName))]} onSelect={handleCompanySelect} />
        <Button type='submit' variant='primary' size='medium' onClick={() => {}}>Add Job</Button>
    </form>
  );
}

