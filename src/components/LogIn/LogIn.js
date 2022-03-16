import React, { useState, useEffect } from 'react'
import './LogIn.css'

const LogIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userValid, setUserValid] = useState(false)
  const [passwordValid, setpasswordValid] = useState(false)

  //Validar username
  useEffect(()=>{
    //acá verifica que exista el usuario
    setUserValid(true)
  },[username])

  //Validar password
  useEffect(()=>{
    //acá verifica que exista el password 
    setpasswordValid(true)
  },[password])
  
  function handleLogIn (){
    console.log('pass: ',password)
    console.log(username)
  }

  return (
  <section className="sign-up">
      <h1>BoardMessage</h1>
      <div className="form-container">
        <form onSubmit={handleLogIn}>
          <input
            className="input-field"
            id="username"
            type="text"
            placeholder="User Name"
            onChange={e => setUsername(e.target.value)}/>
          <input
            className='input-field'
            id="password"
            type='password'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}/>
          <input
            className='check-box'
            type='checkbox'/>
          <button 
            type="submit"
            id="create-account">
              Log In
          </button>
        </form>
      </div>
  </section>
  )
}

export default LogIn