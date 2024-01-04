import React, {useState} from 'react'

const Form = ({user, setUser, handleSubmit}) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }  

    return (
        <form>
            <label htmlFor='userName'> User: </label>
            <input 
                type='text'
                name='userName'
                value={user.userName}
                onChange={handleChange}    
            />
            <label htmlFor='password'> Password: </label>
            <input 
                type='password'
                name='password'
                value={user.password}
                onChange={handleChange}    
            />
            <button onClick={handleSubmit}>Submit</button>
        </form>
  )
}

export default Form