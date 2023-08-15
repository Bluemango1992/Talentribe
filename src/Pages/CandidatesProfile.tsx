import { Layout } from '.';
import { H3, P, Caption, H4 } from '../Typography';
import { Breadcrumbs, Paper, FAB } from '../Components';
import { FaEdit, FaEnvelope, FaFileDownload, FaLinkedin, FaMobile, FaPhone, FaWifi } from 'react-icons/fa';


const CandidatesProfile = () => {


  return (
      <Layout>
          <CandidateInfo />
          <div className='grid grid-cols-3 gap-4'>
              <Activity />
              <Personal />
              <Documents />
              <InternalNotes />
          </div>
      </Layout>
  );
}
  
  export default CandidatesProfile;

  const CandidateInfo = () => {

    const candidate = {
      name: "Alice Green",
      status: "Active",
      currentJob: "Software Engineer",
      currentCompany: "Google",
      location: "London",
      jobType: 'Permanent',
      salaryRange: "£50,000 - £60,000",
      reviewDate: "2023-08-05",
      responsibleAgent: 1,
      addedBy: 1,
      reviewStatus: "Open"
    };

    return (

      <>
      {candidate ? (
      <div className='flex justify-between bg-slate-200 p-3'>
        <div className='flex flex-row gap-3'>
      <div className='flex flex-col'>     
      <H3>{candidate.name || "Default Name"}</H3>
      <P>{candidate.status || "Default Status"}</P>
      <P>{candidate.currentJob || "Default Job"}</P>
      <Caption>{candidate.currentCompany || "Default Company"}</Caption>
      <Breadcrumbs
        items={[
          candidate.jobType || "Default Job Type",
          candidate.salaryRange || "Default Salary Range",
          candidate.location || "Default Location",
        ]}
      />
      </div>
      </div>
      <div className='flex flex-row gap-2'>
      <FAB icon={<FaEdit />} />
      <FAB icon={<FaFileDownload />} />
      <FAB icon={<FaEnvelope />} />
      <FAB icon={<FaPhone />} />
      <FAB icon={<FaMobile />} />
      <FAB icon={<FaWifi />} />
      <FAB icon={<FaLinkedin />} />
      </div>
      </div>
      ) : (
        <div>Loading...</div>
      )}
      </>
    );
  }


  const Activity = () => {
   
    const activities = [
      { date: "2023-08-13", action: "CV sent to Google" },
      { date: "2023-08-12", action: "Updated personal details" },
      { date: "2023-08-11", action: "Added new skill: Python" },
      { date: "2023-08-10", action: "Interview scheduled with Amazon" },
      { date: "2023-08-09", action: "CV updated" },
    ];
  
    return (
      <Paper>
        <H3>Activity Feed</H3>
        <div className='flex flex-col gap-2'>
          {activities.map((activity, index) => (
            <li key={index}>
              <strong>{activity.date}</strong>: {activity.action}
            </li>
          ))}
        </div>
      </Paper>
    );
  }

  const Personal = () => {

    const candidate = {
      name: "Alice Green",
      dob: "01/01/1990",
      email: "name@emial.co.uk",
      phoneNumber: "01234567890",
      address: "123 Street, London, SW1A 1AA",
      nationality: "British",
      linkedin: "linkedin.com/in/name",
      website: "name.com",
    };
  
    return (
      <Paper>
        <H3>Personal</H3>
        <P><strong>Preferred Name:</strong> {candidate?.name || "Not provided"}</P>
        <P><strong>Date of Birth:</strong> {candidate?.dob || "Not provided"}</P> 
        <P><strong>Email:</strong> {candidate?.email || "Not provided"}</P>
        <P><strong>Phone Number:</strong> {candidate?.phoneNumber || "Not provided"}</P>
        <P><strong>Address:</strong> {candidate?.address || "Not provided"}</P>
        <P><strong>Nationality:</strong> {candidate?.nationality || "Not provided"}</P>
        <P><strong>LinkedIn Profile:</strong> {candidate?.linkedin || "Not provided"}</P>
        <P><strong>Website/Portfolio:</strong> {candidate?.website || "Not provided"}</P>
      </Paper>
    );
  }
  

  const Documents = () => {
    return (
      <Paper>
        <H3>Documents</H3>
        <div className='flex flex-col gap-2'>
          <H4>CV</H4>
          <H4>Cover Letter</H4>
          <H4>Portfolio</H4>
        </div>
      </Paper>
    );

  }

  const InternalNotes = () => {
    return (
      <Paper>
        <H3>Internal Notes</H3>
        <div className='flex flex-col gap-2'>
          <H4>Notes</H4>
          <H4>Interview Notes</H4>
        </div>
      </Paper>
    );
  }
