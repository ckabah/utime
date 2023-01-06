import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AuthtContext from '../contexts/AuthContext'
import StringToDate from '../components/StringToDate'
import TaskCard from '../components/TaskCard'

function TodayTask() {
    let [todayTasks, setTodayTasks]= useState([])
    let {authTokens} = useContext(AuthtContext)
    const {baseUrl} = useContext(AuthtContext)
    const [isDelete, setIsDelete] = useState(true)

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
                axios.get(`${baseUrl}/tasks/`,
                {
                    headers:{
                        'Authorization':`Bearer ${authTokens?.access}`
                    },
                    params:{
                        frequency:'today',
                    }
                }
                ).then((response)=>{
                    setTodayTasks(response.data)
                    console.log(response.data)
                })
            )
        }
        getTodayTasks()
    },[isDelete, authTokens, baseUrl])
  return (
    <div>
        <div className=''><h2 className='mb-4 lg:text-2xl'>Today Task</h2></div>
        <StringToDate tasks={todayTasks}></StringToDate>
        <TaskCard tasks={todayTasks} onDelete = {handleDelete}></TaskCard>
    </div>
  )
}

export default TodayTask