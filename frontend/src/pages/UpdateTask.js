import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AuthtContext from '../contexts/AuthContext';
import {useNavigate } from 'react-router-dom';

function UpdateTask() {
    const {authTokens} = useContext(AuthtContext)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const {baseUrl} = useContext(AuthtContext)
    const [task, setTask] = useState({})
    const navigate = useNavigate()
    const {pk} = useParams();

    const updateTask = (e)=>{
        e.preventDefault()
        axios.put(`${baseUrl}/api/tasks/${pk}/`,
        {
            title:task.title,
            start_date:task.start_date,
            end_date:task.end_date,
            status:task.status,
            description:task.description,
        },
        {
            headers:{
                "Authorization":`Bearer ${authTokens?.access}`
            }
        }, 
  
        ).then((response) =>{
            console.log(response.data)
            setSuccessMessage('Update successfuly')
            navigate(-1)
        }
        ).catch((error)=>{
        console.log(error)
        setErrorMessage(error.data)
        })
    }
    const handleChange = (e)=>{
        console.log(e.target.value)
        setTask({...task, [e.target.name]: e.target.value})
        console.log(task)
    }
    const selectOptions = {
        'TD':'Todo',
        'DG':'Doing',
        'D':'Done'
    }
    useEffect(()=>{
        const getTask = ()=>{
            axios.get(`${baseUrl}/tasks/${pk}/`,
                {
                    headers:{
                        'Authorization':'Bearer '+ authTokens?.access
                    }
                }
                
            ).then((response)=>{
                console.log(response.data.title)
                setTask(response.data)
            }).catch((error)=>{
                console.log(error.response)
            })
        }
        getTask()
    },[authTokens, baseUrl, pk])
  return (
    
    <div>
        <div>
            <div><span className='text-green-500'>{successMessage}</span></div>
            <form onSubmit={updateTask} className="task-form flex flex-col gap-2">
            <div className=''><h2 className='mb-4 lg:text-2xl text-center'>Update Task</h2></div>
                <div className='flex flex-col'>
                    <label htmlFor="title">Title</label>
                    <span>{errorMessage.title}</span>
                    <input type="text" name="title" defaultValue={task.title} onChange={(e)=>handleChange(e)} required/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="start_date" >Start date</label>
                    <span>{errorMessage.start_date}</span>
                    <input type="datetime-local" name="start_date" value={`${task.start_date}`.slice(0, 19)} onChange={(e)=>handleChange(e)} required/>
                </div>  
                <div className='flex flex-col'>
                    <label htmlFor="end_date">End ddate</label>
                    <span>{errorMessage.end_date}</span>
                    <input type="datetime-local" name="end_date" value={`${task.end_date}`.slice(0, 19)} onChange={(e)=>handleChange(e)} required/>
                </div>
                <div className='flex flex-col' >
                    <label htmlFor="description">Description</label>
                    <span>{errorMessage.description}</span>
                    <textarea type="textarea" name="description" defaultValue={task.description} onChange={(e)=>handleChange(e)} required/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="status">Status</label>
                    <span>{errorMessage.status}</span>
                    <select name="status" defaultValue={task.status} onChange={(e)=>{handleChange(e);}} className='task-status' required>
                        <option value={task.status} selected disabled hidden>{selectOptions[`${task.status}`]}</option>
                        <option value="TD">Todo</option>
                        <option value="DG">Doing</option>
                        <option value="D">Done</option>
                    </select>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateTask