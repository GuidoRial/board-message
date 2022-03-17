import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
import './LogIn.css'

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  
  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      const auth = await getAuth()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
          const user = userCredential.emailAddress
          console.log(user)
        })
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + errorCode);
    };

  }

  return (
  <section className="sign-up">
      <h1>BoardMessage / Log In</h1>
      <div className="form-container">
        <form onSubmit={handleLogIn}>
          <input
            className="input-field"
            id="email"
            type="text"
            placeholder="E-mail"
            onChange={e => setEmail(e.target.value)}/>
          <input
            className='input-field'
            id="password"
            type='password'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}/>
          <button 
            type="submit"
            id="create-account">
              Log In
          </button>
          <button className="demo-butt">User Demo One</button>
          <button className="demo-butt">User Demo Two</button>
        </form>
      </div>
  </section>
  )
}

export default LogIn