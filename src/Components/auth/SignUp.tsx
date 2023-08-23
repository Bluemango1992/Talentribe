import { useState } from 'react';
import { Button, Input, SelectField } from '../../Components';
import { H2, P } from '../../Typography';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
    email?: string;
    password?: string;
}

const SignUp = ( { email, password }: Props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [onboarding, setOnboarding] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                setOnboarding(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === "auth/email-already-in-use") {
                    setErrorMessage("An account already exists with the provided email address.");
                } else {
                    setErrorMessage(errorMessage);
                }
            });
    }

    const navigate = useNavigate();

    const handleOnboarding = async () => {
        const userData = {
            firstName,
            lastName,
            country,
            email
        };

        console.log(userData);
    
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log(responseData);
            navigate('/jobs');
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error.message);
        }
    }


    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-100 to-blue-200">
            <div className="flex flex-col items-center justify-center gap-5 border border-gray-300 rounded-md h-1/2 w-1/3 shadow-lg bg-white">
            {!onboarding ? (
                <>
                    <img src="src/assets/Talentribe.png" alt="logo" className="w-12" />
                    <H2>Sign Up</H2>
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleSignUp}>Sign Up</Button>
                    <P>{errorMessage}</P>
                    <P>Already have an account? <Link to="/">Sign In</Link></P>
                </>
            ) : (
                <>
                    <H2>Onboarding</H2>
                    <div className="flex flex-col w-1/2 gap-5">
                    <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <SelectField placeholder="Country" value={country} options={["USA", "Canada", "Mexico"]} onSelect={(option: string) => setCountry(option)}>
                    </SelectField>
                    </div>
                    <Link to="/jobs"><Button onClick={handleOnboarding}>Finish Onboarding</Button></Link>
                    
                </>
            )}
            </div>
        </div>
    );
}

export default SignUp;
