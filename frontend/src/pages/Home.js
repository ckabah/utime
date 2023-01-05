import React from 'react'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import {Navigate} from 'react-router-dom'

function Home() {
  let {user} = useContext(AuthContext)
  return (
    user ? <Navigate to='/dashbord'></Navigate>:<Navigate to='/login'></Navigate>
  )
}

export default Home