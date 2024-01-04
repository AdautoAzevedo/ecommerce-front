import React from 'react';
import Form from './Form';

const Register = ({user, setUser}) => {

    const registerUser = async() => {
        const baseURL = "http://localhost:3500/users";
        try {
            const response = await fetch(baseURL, {
                method:"POST",
                headers: {
                    "Content-type":"application/json"
                },
                body:JSON.stringify(user)
            });

            if (!response.ok) {
                const message = response.status;
                throw new Error(message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Registering...");
        registerUser(user);
    };

    return (
        <main>
            <h2>Register</h2>
            <Form user={user} setUser={setUser} handleSubmit={handleSubmit}/>
        </main>
    );
};

export default Register;