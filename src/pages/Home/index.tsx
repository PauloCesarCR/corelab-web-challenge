import NavBar from "../../components/Navbar";
import NewTask from "../../components/NewTask";
import styles from './Home.module.scss'
import CardTask from "../../components/CardTask";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { ITask } from "../../types/Task";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {

  const [allTasks, setAllTasks] = useState([])

  useEffect(()=>{
    getTAllTasks()
  },[])

  async function getTAllTasks() {
    try {
      const { data } = await api.get("/tasks");
      setAllTasks(data);
    } catch (error) {
      toast.error("Erro ao carregar as tasks");
    }
  }

  return (
    <div className={styles.Tasks}>
      <NavBar allTasks={allTasks} setAllTasks={setAllTasks} getTAllTasks={getTAllTasks} />
      <NewTask allTasks={allTasks} setAllTasks={setAllTasks} />

      <h1>Favoritas</h1>
      <div className={styles.cards}>
      {allTasks.map((task: ITask)=>(
        task.favorite == true && <CardTask key={task.id}  allTasks={allTasks} setAllTasks={setAllTasks} task={task}/>
      ))}
      </div>
      
      <h1>Outras</h1>
      <div className={styles.cards}>
      {allTasks.map((task: ITask)=>(
        task.favorite == false && <CardTask key={task.id}  allTasks={allTasks} setAllTasks={setAllTasks} task={task}/>
      ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
