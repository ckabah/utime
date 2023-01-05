import React from 'react'
import { useContext, useState, useEffect} from 'react'
import axios from 'axios'
import AuthtContext from '../contexts/AuthContext'
import TaskCard from '../components/TaskCard'
import StringToDate from '../components/StringToDate'

function TasksList() {
    let [tasks, setTasks]= useState([])
    let [isDelete, setIsDelete] = useState(true)
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
        const getTasks = ()=>{
            return(
                axios.get(`${baseUrl}/tasks/`,
                {
                    headers:{
                        'Authorization':`Bearer ${authTokens?.access}`
                    }
                }
                ).then((response)=>{
                    setTasks(response.data)
                    console.log(response.status)
                })
            )
        }
        getTasks()
    },[isDelete, authTokens, baseUrl])
  return (
    
    <div className='dash-content'>
        <div className=''><h2 className='mb-4 lg:text-2xl'>Task List</h2></div>
        <StringToDate tasks={tasks}></StringToDate>
        <TaskCard tasks={tasks} onDelete={handleDelete}></TaskCard>
    </div>
  )
}

export default TasksList