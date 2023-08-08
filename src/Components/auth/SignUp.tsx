import { useState } from 'react';
import { Button } from '../';
import { H2 , P } from '../../Typography';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successfully signed up
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='flex flex-col items-center justify-center gap-5 border border-gray-300 rounded-md h-1/2 w-1/3 shadow-lg'>
            <H2>Sign Up</H2>
                <input className ='p-3 border border-gray-500 rounded-md' type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input className ='p-3 border border-gray-500 rounded-md' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSignUp} theme='dark'>Sign Up</Button>
                <P>Already have an account? <Link to="/signin">Sign In</Link></P>
            </div>
        </div>
    )
}

export default SignUp;
