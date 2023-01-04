import React from 'react'

function StringToDate({tasks}) {
  return (
    tasks.map(task => {
        task.start_date = new Date(task.start_date);
        task.end_date = new Date(task.end_date);
        
    })
  )
}

export default StringToDate