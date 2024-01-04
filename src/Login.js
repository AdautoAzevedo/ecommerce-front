import React from 'react';
import { useAuth } from './context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';

const Login = ({ user, setUser }) => {

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const sendLoginRequest = async ()  =>{
    const authURL = "http://localhost:3500/login";
      try {
          console.log(user);
          const response = await fetch(authURL,{
              method: "POST",
              headers: {"Content-type":"application/json"},
              body: JSON.stringify(user)
          });

          if (!response.ok){
            const message = response.status;
            throw new Error(message);
          }

          const data = await response.json();
          const token = data.accessToken;
          console.log(token);
          console.log("Logado");
          setToken(token);
        } catch (error) {
          console.log(error);
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("logging in...");
    sendLoginRequest();
  };

  return (
    <main>
        <h2>Login Page</h2>
        <Form user={user} setUser={setUser} handleSubmit={handleSubmit} />
        <Link to={"/productsform"} className='link' >Click here to Products Form</Link>
    </main>
  )
}

export default Login