
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { H1, P2 } from './Typography';
import { Candidates , CandidatesProfile , Clients, Jobs, Organisations, OrganisationsProfile, JobsProfile, ClientsProfile } from './Pages';
import { SignIn , SignUp } from './Components/auth';



const App = () => {
  return (
      <Router>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/clients/:clientID' element={<ClientsProfile />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/jobs/:jobID' element={<JobsProfile />} />
            <Route path='/candidates' element={<Candidates />} />
            <Route path="/candidates/:candidateID" element={<CandidatesProfile />} />
            <Route path='/organisations' element={<Organisations />} />
            <Route path="/organisations/:organisationID" element={<OrganisationsProfile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </Router>
  );
}

export default App


const NotFound = () => {
  return (
    <div className='flex flex-col items-center'>
      <H1>404</H1>
      <P2>Page not found</P2>
    </div>
  );
}































