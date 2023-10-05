import noFavoriteImg from '../../assets/noFavorite.png'
import favoriteImg from '../../assets/favorite.png'
import styles from './NewTask.module.scss'
import {useState} from 'react'
import api from '../../lib/api'
import { ITask } from '../../types/Task'

interface newTaskProps {
  allTasks: ITask[]
  setAllTasks: any
}

export default function NewTask({allTasks, setAllTasks}: newTaskProps){

  const [form, setForm] = useState({title: "", description: ""})
  const [favorite, setFavorite] = useState(false)

  function getInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({...form,[e.target.name]: e.target.value})
  }
  async function addNewTask(e: React.KeyboardEvent<HTMLInputElement>){
    
    if(!form.title || !form.description || e.key != "Enter"){
      return;
    }
    
    try {
      const {data} = await api.post("/tasks", {...form, favorite})
      setAllTasks([...allTasks, {...data}])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.newTask}>
        <div className={styles.titleDiv}>
            <input onChange={getInputValue} name='title' placeholder='Titulo'></input>
            <img onClick={()=> setFavorite(!favorite)} src={favorite ? favoriteImg: noFavoriteImg} />
        </div>
      <input onChange={getInputValue} name='description' onKeyDown={(e)=> addNewTask(e)} placeholder='Criar Nota..'></input>
    </div>
  )
}
