import {useState} from "react";
import Header from "./components/Header"
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {
    const [tasks, setTasks]=useState([{id: 1, text: "Doctors Appointment", day: "Feb 5th @ 2:30pm", reminder: true}, {id: 2, text: "Meeting at School", day: "Feb 6th @ 1:30pm", reminder: true}, {id: 3, text: "Food Shopping", day: "Feb 5th @ 2:30pm", reminder: false}])

    const addTask=(task)=>{
        const id=Math.floor(Math.random()*10000)+1
        const newTask={id, ...task}
        setTasks([...tasks, newTask])
    }

    const deleteTask=(id)=>{
        setTasks(tasks.filter((task)=>task.id!==id))
    }

    const toggleReminder=(id)=>{
        setTasks(tasks.map((task)=> task.id===id?{...task, reminder: !task.reminder} : task))
    }

    return (
        <div className="container">
            <Header/>
            <AddTask onAdd={addTask}/>
            {tasks.length>0?(<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>):("No Tasks to show")}
        </div>
    );
};

export default App;
