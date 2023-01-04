import React from 'react'
import {useEffect } from 'react'
import {Link } from 'react-router-dom'


function TaskCard(props) {
    function handleNave(pk){
        const content = document.getElementById(`menu-content-${pk}`)
        content.classList.toggle('active-menu')
    }

    const handleDetail = (pk)=>{
        const task_description = document.getElementById(`description-${pk}`)
        task_description.classList.toggle('active-description')
    }
    useEffect(()=>{
    },[])
  return (
    <div className='task-container'>
        <div className='task-head '>
            <Link to='/dashbord/tasks/add/'>New</Link>
        </div>
        {
            props.tasks.map(task =>(
                <div key={task.pk} className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center'>
                        <div className={`flex flex-col h-6 p-1 text-center justify-center mr-2 ${task.status}`}>
                            <span>{
                            task.status ==='TD'?'Todo':(task.status ==='D'?'Done':'Doing')
                            }</span>
                        </div>
                        
                        <div className=''>
                            <p id={`title-${task.pk}`} className='cursor-pointer text-lg font-bold' onClick={()=>{handleDetail(task.pk)}}>{task.title}</p>
                        </div>
                        <div className=''>
                            <span id={`menu-${task.pk}`} className='cursor-pointer ml-2 text-lg font-bold text-gray-500' onClick={()=>handleNave(task.pk)}>...</span>
                            <ul id={`menu-content-${task.pk}`} className='hidden bg-gray-100 px-1 fixed'>
                                <li>
                                    <Link to={`/dashbord/tasks/update/${task.pk}`}>Update</Link>   
                                </li>
                                <li onClick={()=>props.onDelete(task.pk)} className='cursor-pointer'>
                                    Delete
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id={`description-${task.pk}`} className='description'>
                        <p>{task.description}</p>
                    </div>
                    <div className='task-date text-sm'>
                        <span>
                            {
                            `${(task.start_date.getMonth()+1) < 10 ? ("0"+(task.start_date.getMonth()+1)):task.start_date.getMonth()+1}/
                            ${task.start_date.getDate() < 10 ? ("0"+(task.start_date.getDate())):task.start_date.getDate()} - 
                            ${task.start_date.getHours() < 10 ? ("0"+(task.start_date.getHours())):task.start_date.getHours()}:
                            ${task.start_date.getMinutes() < 10 ? ("0"+(task.start_date.getMinutes())):task.start_date.getMinutes()}`
                            }
                        </span>
                        {task.end_date?<span> to </span>:null}
                        <span>
                            {
                            `${task.end_date.getHours() < 10 ? ("0"+(task.end_date.getHours())):task.end_date.getHours()}:
                            ${task.end_date.getMinutes() < 10 ? ("0"+(task.end_date.getMinutes())):task.end_date.getMinutes()}`
                            }
                        </span>
                    </div>
                    
                </div>
            ))
        }
    </div>
  )
}

export default TaskCard