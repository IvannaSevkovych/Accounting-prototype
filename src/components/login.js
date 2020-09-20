import React, { useState } from 'react';

// Importing components
import { InputField } from './inputField';

export function Login(props) {

    // State stuff
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    // Helper functions
        const submitPostRequest = (e) => {
        e.preventDefault();
  
        const url = `${process.env.REACT_APP_SERVICE_BASE_URL}/login`;
    
        const body = {
            user: user.toLowerCase(), 
            password,
        }; 
    
    
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(response=>{
          alert(response.status + " " + response.statusText); //TODO show status
          localStorage.setItem('token', response.status)
        })
        .then(()=>console.log(body))
        .catch(error=>alert(error))
      }

    

    return (

        <div className="Login">

            <h1>Login Page</h1>

            <form
                onSubmit={submitPostRequest}
                >

                <InputField name="User:" value={user} onChange={setUser} />

                <InputField name="Password:" value={password} onChange={setPassword} />

                <button type="submit" >Submit</button>

            </form>

            
        </div>
    )
}