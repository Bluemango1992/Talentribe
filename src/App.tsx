
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { H1, P2 } from './Typography';
import { Provider } from 'react-redux';
import store from './Pages/store';
import { Candidates , CandidateProfile , Clients, Jobs, Organisations } from './Pages';
import { SignIn , SignUp } from './Components/auth';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/candidates' element={<Candidates />} />
            <Route path='/candidate/:id' element={<CandidateProfile />} />
            <Route path='/organisations' element={<Organisations />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </Router>
    </Provider>
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



























