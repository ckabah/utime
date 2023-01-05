import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import MenuButton from '../components/icons/MenuButton'
import CancelButton from '../components/icons/Cancel'
import Logo from '../logo.svg'
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
        <div id='side_id' className='side bg-gray-500'>
            <div className='sidebar flex flex-col'>
            <div className='mb-8'>
                <img className='h-8' src={Logo} alt=""/>
            </div>
                <CancelButton onClick={HandleCancel}></CancelButton>
                <div className='side-links flex flex-col gap-2'>
                    <li><Link to='/dashbord/' onClick={HandleCancel}>Tasks List</Link></li>
                    <li><Link to='/dashbord/tasks/today/' onClick={HandleCancel}>Today Tasks</Link></li>
                    <li><Link to='/dashbord/tasks/tomorow/' onClick={HandleCancel}>Tomorow Tasks</Link></li>
                    <li><Link to='/dashbord/tasks/add/' onClick={HandleCancel}>New</Link></li>
                    <li><Link to='/logout/'>Logout</Link></li>
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