import React from 'react'
import styles from './Colors.module.scss'
import api from '../../lib/api'
import { ITask } from '../../types/Task'

interface colorsProps {
  allTasks: ITask[]
  setAllTasks: any
  task: ITask
  setModal: any
}
export default function Colors({allTasks, setAllTasks,task, setModal} : colorsProps) {

    const colors = ["#BAE2FF", "#B9FFDD","#FFE8AC", "#FFCAB9", "#F99494", "#9DD6FF", "#ECA1FF",
     "#DAFF8B","#FFA285", "#CDCDCD", "#979797","#A99A7C"]

     async function setColor(color: string){
      try {
        const {data} = await api.put(`/tasks/${task.id}`,{color})
        const getIndex = allTasks.findIndex((task)=>{
          return task.id == data.id
        })
          let newArray = allTasks
          newArray[getIndex] = data;
          setAllTasks([...newArray])
          setModal(false)
      } catch (error) {
        console.log(error)  
      }

     }

  return (
    <div className={styles.colors}>
        {colors.map((color)=>(
            <div onClick={()=> setColor(color)} key={color} style={{ height: "30px", width: "30px", background: color, borderRadius: "50%"}}></div>
        ))}
    </div>
  )
}
