import {Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthtContext from "../contexts/AuthContext";
import React from 'react'

function PrivateRoute({children, ...rest}) {
    let {user} = useContext(AuthtContext)
  return (
        !user ? <Navigate to='/login'/>: children
  )
}

export default PrivateRoute