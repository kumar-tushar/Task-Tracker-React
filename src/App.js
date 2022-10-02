import {useEffect, useState} from "react";
import Header from "./components/Header"
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {

    const [showAddTask, setShowAddTask]=useState(false)

    const [tasks, setTasks]=useState([])

    useEffect(()=>{
        const getTasks=async ()=>{
            const tasksFromServer=await fetchTasks()
            setTasks(tasksFromServer)
        }
       void getTasks()
    },[])

    const fetchTasks=async ()=>{
        const res=await fetch(`http://localhost:5000/tasks`)
        return await res.json()
    }

    const addTask= async (task)=>{
        const res=await fetch(`http://localhost:5000/tasks`,
            {method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(task)
            })

        const data= await res.json()

        setTasks([...tasks, data])

    }

    const deleteTask= async (id)=>{
        await fetch (`http://localhost:5000/tasks/${id}`,{method: 'DELETE'})
        setTasks(tasks.filter((task)=>task.id!==id))
    }

    const toggleReminder=(id)=>{
        setTasks(tasks.map((task)=> task.id===id?{...task, reminder: !task.reminder} : task))
    }

    return (
        <div className="container">
            <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length>0?(<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>):("No Tasks to show")}
        </div>
    )
}

export default App
