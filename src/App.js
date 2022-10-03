import {useEffect, useState} from "react"
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"
import api from "./api/tasks"

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
        const res=await api.get("/tasks")
        return res.data
    }

    const fetchTask=async (id)=>{
        const res=await api.get(`/tasks/${id}`)
        return  res.data
    }

    const addTask= async (task)=>{
        const res=await api.post(`/tasks`, task)

        const data= res.data

        setTasks([...tasks, data])
    }

    const deleteTask= async (id)=>{
        await api.delete(`/tasks/${id}`)
        setTasks(tasks.filter((task)=>task.id!==id))
    }

    const toggleReminder=async (id)=>{
        const taskToToggle=await fetchTask(id)
        const updTask={...taskToToggle, reminder: !taskToToggle.reminder}

        const res=await api.put(`/tasks/${id}`, updTask)

        const data= res.data

        setTasks(tasks.map((task)=> task.id===id?{...task, reminder: data.reminder} : task))
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
                <Routes>
                    <Route path='/' element={
                            <>
                                {showAddTask && <AddTask onAdd={addTask} />}
                                {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks To Show')}
                            </>
                        }
                    />
                    <Route path='/about' element={<About />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    )
}

export default App
