import React from 'react'
import axios from 'axios'
import { useState , useContext,} from 'react'
import AuthtContext from '../contexts/AuthContext'
import { useNavigate , Link} from 'react-router-dom'
import Logo from '../logo.svg'

function Register() {
  const {baseUrl} = useContext(AuthtContext)

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const registerUser = (e)=>{
    e.preventDefault()
    axios.post(`${baseUrl}/auth/users/`,
    {
      email:e.target.email.value,
      username:e.target.username.value,
      password:e.target.password.value,
      password2:e.target.password2.value
    }
    ).then((response) =>{
      if (response.status === 201){
        navigate(-1)
      }
    }
    ).catch((response)=>{
      console.log(response.response)
      setErrorMessage(response.response.data)
    })
  }

  return (
    <div className="login-register flex flex-col">
      <div className='mx-4'>
        <img className='h-20 mt-16' src={Logo} alt=""/>

      </div>
      <h2 className='font-bold text-center  my-4 text-4xl'>Register</h2>
      <form onSubmit={registerUser} className="login-register-form flex flex-col px-6 gap-2">
        <div className='flex flex-col'>
          <label htmlFor="username">Username</label>
          <span>{errorMessage.username}</span>
          <input type="text" name="username" required/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email">Email</label>
          <span>{errorMessage.email}</span>
          <input type="email" name="email" required/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="username">Password</label>
          <span>{errorMessage.password}</span>
          <input type="password" name="password" required/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password_confirm">Password Confirm</label>
          <span>{errorMessage.password2}</span>
          <input type="password" name="password2" required/>
        </div>
        <button type="submit">Register</button>
        <div>
            <p className=''><Link to='/login' className='text-blue-500'>Log In</Link> | Password forgate</p>
        </div>
      </form>
    </div>
  )
}

export default Register