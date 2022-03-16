import React, { useState, useEffect } from 'react'
import './LogIn.css'

const LogIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checkBox, setCheckBox] = useState(false)
  const [userValid, setUserValid] = useState(false)
  const [passwordValid, setpasswordValid] = useState(false)

  //Validar username
  useEffect(()=>{
    //acá verifica que exista el usuario
    if (username.length < 12 &&
        username.length > 5){
          setUserValid(true)
    }
  },[username])

  //Validar password
  useEffect(()=>{
    //acá verifica que exista el password
    if (password.length < 12 &&
        password.length > 5){
      setpasswordValid(true)
    }
  },[password])
  //CheckBox hay que ver porque no vuelve al false
  useEffect(()=>{
    console.log(checkBox);
  },[checkBox])

  //Una ves se valido el usuario y la password, escucha el VALID y da autorización
  useEffect(()=>{
    if(userValid){
    }
  },[userValid])

  useEffect(()=>{
    if(passwordValid){
    }
  },[passwordValid])


  function handleLogIn (){
    if(passwordValid && userValid){
      let userLogIn = username + password
      console.log(userLogIn);
    }
  }

  return (
  <section className="sign-up">
      <h1>BoardMessage</h1>
      <div className="form-container">
        <form>
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
          <label>You are Human</label>
          <input
            className='check-box'
            type='checkbox'
            onChange={e => setCheckBox(true)}/>
          <button 
            type="submit"
            id="create-account"
            onClick={handleLogIn}>
              Log In
          </button>
        </form>
      </div>
  </section>
  )
}

export default LogIn