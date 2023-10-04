import styles from './CardTask.module.scss'
import noFavoriteImg from '../../assets/noFavorite.png'
import favoriteImg from '../../assets/favorite.png'
import edit from '../../assets/edit.png'
import color from '../../assets/color.png'
import close from '../../assets/close.png'
import { ITask } from '../../types/Task'
import api from '../../lib/api'
import {useState} from 'react'
import Colors from '../Colors'
interface PropsCard {
  task: ITask
  allTasks: ITask[]
  setAllTasks: any
}

export default function CardTask({task, allTasks, setAllTasks}: PropsCard) {
  const [modal, setModal] = useState(false)
  const [disabledEditMode, setdisabledEditMode] = useState(true)
  const [form, setForm] = useState({title: "", description: ""})

  function getInputValue(e: any) {
    setForm({...form,[e.target.name]: e.target.value})
  }

  async function deleteCard(id: string){
      console.log(id)
    try {
        await api.delete(`/tasks/${id}`)

        setAllTasks(allTasks.filter((taskFilter)=>{
          return id != taskFilter.id
        }))
        
    } catch (error) {
      console.log(error)
    }
  }

  async function favoriteCard(id: string){

    try {
      const {data} = await api.put(`/tasks/${id}`, {favorite:!task.favorite})
      const getIndex = allTasks.findIndex((task)=>{
        return task.id == data.id
      })
      let newArray = allTasks
      newArray[getIndex] = data;
      setAllTasks([...newArray])
      
  } catch (error) {
    console.log(error)
  }
  }

  function editColor(id: string){
    if(id == task.id){
      setModal(!modal)
    }
  }


  async function editCard(id: string, e: any){
      
    if(!form.title || !form.description || e.key != "Enter"){
      return;
    }

    try {
      const {data} = await api.put(`/tasks/${id}`, {...form})

      const index = allTasks.findIndex((taskFind)=>{
        return taskFind.id == data.id
      })
      let newArray = allTasks
      newArray[index] = data;
      setAllTasks([...newArray])
      setdisabledEditMode(true)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div id={task.id} className={styles.cardTask} style={{backgroundColor: task.color}}>
      <div>
        <div className={styles.cardInfo}>
          <input name='title' onChange={getInputValue} disabled={disabledEditMode} placeholder={task.title}></input>
          <img onClick={()=> favoriteCard(task.id)} src={task.favorite ? favoriteImg : noFavoriteImg} />
        </div>
      </div>
      <textarea name='description' onKeyDown={(e) => editCard(task.id, e)} onChange={getInputValue} disabled={disabledEditMode} placeholder={task.description}></textarea>
      <div className={styles.iconsDiv}>
        <div>
           <img onClick={()=> setdisabledEditMode(!disabledEditMode)} src={edit} />
           <img onClick={()=> editColor(task.id)}  src={color} />
        </div>
           <img onClick={()=> deleteCard(task.id)} src={close} />
      </div>

       {modal && (
        <Colors task={task} allTasks={allTasks} setAllTasks={setAllTasks} setModal={setModal} />
      )}
  
    </div>
  )
}
