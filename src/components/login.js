import React from 'react';
import { useForm } from 'react-hook-form';


export function Login() {

  const { register, handleSubmit, errors } = useForm();


  // Helper functions
      const submitPostRequest = (data) => {

      const url = `${process.env.REACT_APP_SERVICE_BASE_URL}/login`;


      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response=>{
        alert(response.status + " " + response.statusText); //TODO show status
        return response.json();
      })
      .then(user=>console.log(user))
      .catch(error=>alert(error))
    }


  return (

    <div className="Login">

      <h1>Login Page</h1>

      <form
        onSubmit={handleSubmit(submitPostRequest)}
      >

        <input type="text" placeholder="User:" name="user" ref={register} />

        <input
          type="password"
          placeholder="Password:"
          name="password"
          ref={register({ required: "Password required", minLength: { value: 8, message: "Password is too short"} })} 
        />

        {errors.password && <h4>{errors.password.message}</h4>}

        <button type="submit" >Submit</button>

      </form>


    </div>
  )
}