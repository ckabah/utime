import React from 'react'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import Logo from '../logo.svg'

function Login() {
    let {getToken} = useContext(AuthContext)
    let {user} = useContext(AuthContext)
    let {logionMessage} = useContext(AuthContext)
  return (
    user ? <Navigate to='/dashbord'></Navigate>:
    <div className='login-register'>
      <div className='mx-4'>
        <img className='h-20 mt-16' src={Logo} alt=""/>

      </div>
      <h2 className='font-bold text-center  my-4 text-4xl'>Login</h2>
        <form onSubmit={getToken} className='login-register-form flex flex-col px-6 gap-2'>
          <p className='text-red-500'>{logionMessage}</p>
          <div className='flex flex-col'>
            <label htmlFor="username">Username or Email</label>
            <input id='username_id' type='text' name='username' required/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
            <input type='password' name='password' required/>
          </div>
          <button type="submit">Login</button>
          <div>
            <p><Link to='/register' className='text-blue-500'>Register</Link> | Password forgate</p>
          </div>
        </form>
    </div>
  )
}

export default Login