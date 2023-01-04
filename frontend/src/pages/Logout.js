import React from 'react'
import { useContext, useEffect } from 'react'
import AuthtContext from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'


function Logout() {
    let {logoutUser} = useContext(AuthtContext)
    useEffect(()=>{
        logoutUser()
    })
  return (
    <Navigate to='/login'></Navigate>
  )
}

export default Logout