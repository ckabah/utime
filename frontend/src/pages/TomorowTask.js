import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AuthtContext from '../contexts/AuthContext'
import TaskCard from '../components/TaskCard'
import StringToDate from '../components/StringToDate'


function TomorowTask() {
    let [tomorowTasks, setTomorowTasks]= useState([])
    const [isDelete, setIsDelete] = useState(true)
    let {authTokens} = useContext(AuthtContext)
    const {baseUrl} = useContext(AuthtContext)

    const handleDelete = (pk)=>{
        if(window.confirm("Are you sure you want to delete this task ?")){
           axios.delete(`${baseUrl}/tasks/${pk}/`,{
            headers:{
                'Authorization':'Bearer '+ authTokens?.access
            }
           }).then((response)=>{
            setIsDelete(!isDelete)
           })
        }
    }
    useEffect(()=>{
        const getTodayTasks = ()=>{
            return(
                axios.get(`${baseUrl}/api/tasks/`,
                {
                    headers:{
                        'Authorization':`Bearer ${authTokens?.access}`
                    },
                    params:{
                        frequency:'tomorow',
                    }
                }
                ).then((response)=>{
                    setTomorowTasks(response.data)
                })
            )
        }
        getTodayTasks()
    },[isDelete, authTokens, baseUrl])
  return (
    <div>
        <div className='dash-content'>
        <div className=''><h2 className='mb-4 lg:text-2xl'>Tomorow Task</h2></div>
            <StringToDate tasks={tomorowTasks}></StringToDate>
            <TaskCard tasks={tomorowTasks} onDelete={handleDelete}></TaskCard>
        </div>
    </div>
  )
}

export default TomorowTask