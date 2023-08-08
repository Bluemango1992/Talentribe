import { useState } from 'react';
import { Button , Input } from '../';
import { H2 } from '../../Typography';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Add this line

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate('/jobs');  // Navigate to the jobs page upon successful sign-in
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                    setErrorMessage("No account matches the provided credentials.");
                } else {
                    setErrorMessage(errorMessage);
                }
            });
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center justify-center gap-5 border border-gray-300 rounded-md h-1/2 w-1/3 shadow-lg'>
            <H2>Sign In</H2>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display the error message */}
                <Input label='Email' type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <Input label='Password' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSignIn} theme='dark'>Sign In</Button>
                <p className="mt-4">Don't have an account? <Link to="/signup">Sign Up</Link></p> 
            </div>
        </div>
    )
}

export default SignIn;



