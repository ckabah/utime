import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import MenuButton from '../components/icons/MenuButton'
import CancelButton from '../components/icons/Cancel'

function Dashbord() {
    
    const HandleDisplayMenu = ()=>{
        let side = document.getElementById('side_id')
        side.classList.add('side-active')
        console.log('ok')
    }
    const HandleCancel = ()=>{
        let side = document.getElementById('side_id')
        side.classList.remove('side-active')
    }
  return (
    <div className='dashbord flex flex-col'>
        <MenuButton onClick={HandleDisplayMenu} className='bg-gray-500'></MenuButton>
        <div id='side_id' className='side bg-gray-500 '>
            <div className='sidebar flex flex-col'>
                <CancelButton onClick={HandleCancel}></CancelButton>
                <div className='side-links flex flex-col gap-2'>
                    <Link to='/dashbord/' onClick={HandleCancel}>Tasks List</Link>
                    <Link to='/dashbord/tasks/today/' onClick={HandleCancel}>Today Tasks</Link>
                    <Link to='/dashbord/tasks/tomorow/' onClick={HandleCancel}>Tomorow Tasks</Link>
                    <Link to='/dashbord/tasks/add/' onClick={HandleCancel}>New</Link>
                    <Link to='/logout/'>Logout</Link>
                </div>
            </div>
        </div>
        <div className='dash-container'>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default Dashbord