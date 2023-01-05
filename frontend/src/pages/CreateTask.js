import React from 'react'
import axios from 'axios'
import { useState, useContext } from 'react'
import AuthtContext from '../contexts/AuthContext'


function CreateTask() {
    const {baseUrl} = useContext(AuthtContext)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    let {authTokens} = useContext(AuthtContext)

    const addTask = (e)=>{
    
        e.preventDefault()
        axios.post(`${baseUrl}/api/tasks/`,
        {
            title:e.target.title.value,
            start_date:e.target.start_date.value,
            end_date:e.target.end_date.value,
            description:e.target.description.value
        },
        {
            headers:{
                "Authorization":`Bearer ${authTokens?.access}`
            }
        }
  
        ).then((response) =>{
            setSuccessMessage(`${response.data.username} is create successfuly`)
        }
        ).catch((response)=>{
        setErrorMessage(response.response.data)
        })
    }

    return (
        <div className='add-task'>
            
            <form onSubmit={addTask} className='task-form flex flex-col gap-2'>
            <div className=''><h2 className='mb-4 lg:text-2xl text-center'>Add Task</h2></div>
            <div><span className='text-green-500'>{successMessage}</span></div>
                <div className='flex flex-col'>
                    <label htmlFor="title" className=''>Title</label>
                    <span className='text-red-500' >{errorMessage.title}</span>
                    <input type="text" name="title" required/>
                </div>
                <div className='flex flex-col'>   
                    <label htmlFor="start_date">Start date</label>
                    <span className='text-red-500'>{errorMessage.start_date}</span>
                    <input type="datetime-local" name="start_date" required/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="end_date">End ddate</label>
                    <span className='text-red-500'>{errorMessage.end_date}</span>
                    <input type="datetime-local" name="end_date" required/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="description">Description</label>
                    <span className='text-red-500'>{errorMessage.description}</span>
                    <textarea type="textarea" name="description" required/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default CreateTask