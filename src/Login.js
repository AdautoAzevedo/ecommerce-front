import React from 'react';
import { useAuth } from './context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';
import { userLogin } from './services/AuthServices';

const Login = ({ user, setUser }) => {

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const sendLoginRequest = async ()  =>{
    try {
      const token = await userLogin(user);
      setToken(token);
    } catch (error) {
      console.error(error);
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