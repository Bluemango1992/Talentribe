import { Table } from '../Components';
import { Layout } from '../Pages';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { H2 } from '../Typography';

interface Jobs {
  title: string;
  location: string;
  salaryRange: string;
  jobType: string;
}

const Jobs = () => {
  const [jobData, setJobData] = useState<Jobs[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs
    fetch('http://localhost:3001/jobs')
    .then((res) => res.json())
    .then((jobData) => {
      // Fetch organisations
      fetch('http://localhost:3001/organisations')
      .then((res) => res.json())
      .then((organisations) => {
        // Map through jobs and replace ID with organisation names
        const updatedJobs = jobData.map(job => ({
          ...job,
          companyName: organisations.find(organisation => organisation.organisationID === job.company)?.companyName || 'Unknown'
        }));
        
        setJobData(updatedJobs);
      });
    });
  }, []);

  const handleRowClick = (id: string) => {
    navigate(`/job/${id}`);
  };

  return (
    <Layout>
      <H2>Jobs</H2>
      <Table
        data={jobData}
        headers={['Title', 'Location', 'Salary Range', 'Job Type', 'Company Name']}
        keys={['title', 'location', 'salaryRange', 'jobType', 'companyName']}
        onRowClick={handleRowClick}
      />
    </Layout>
  );
}

export default Jobs;

