import React from 'react'
import noteImg from '../../assets/noteImg.png'
import closeImg from '../../assets/close.png'
import styles from './Navbar.module.scss'
import searchImg from '../../assets/search.png'
import { ITask } from '../../types/Task'

interface PropsCard {
  allTasks: ITask[]
  setAllTasks: any
  getTAllTasks: any
}

export default function NavBar({allTasks, setAllTasks,getTAllTasks} : PropsCard) {



  function searchNotes(e: React.ChangeEvent<HTMLInputElement>){
    const text = e.target.value

    const filterTasks = allTasks.filter((task)=>{
      return task.title.toLowerCase().includes(text.toLowerCase())
    }) 
    
    if(text){
      return setAllTasks([...filterTasks])
    }
    
    getTAllTasks()
  }

  return (
    <div className={styles.navBar}>
      <div className={styles.infoNav} >
        <img src={noteImg} alt='bloco de notas' />
        <h3>CoreNotes</h3>
        <div className={styles.inputDiv}>
        <input onChange={searchNotes} placeholder='Pesquisar notas'/> 
        <img src={searchImg} />
        </div>
      </div>
      
       <img src={closeImg} alt='close'/>

    </div>
  )
}
