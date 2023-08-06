import { useState } from 'react'
import { Button } from '../'
import { H2 } from '../../Typography';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <H2>Sign In</H2>
            <div className='flex flex-col items-center gap-5 p-5 border border-gray-300 rounded-md'>
                <input className ='p-3 border border-gray-500 rounded-md' type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input className ='p-3 border border-gray-500 rounded-md' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSignIn} theme='dark'>Sign In</Button>
            </div>
        </div>
    )
}

export default SignIn
