import {useState} from "react";
import Header from "./components/Header"
import Tasks from "./components/Tasks";

const App = () => {
    const [tasks, setTasks]=useState([{id: 1, text: "Doctors Appointment", day: "Feb 5th @ 2:30pm", reminder: true}, {id: 2, text: "Meeting at School", day: "Feb 6th @ 1:30pm", reminder: true}, {id: 3, text: "Food Shopping", day: "Feb 5th @ 2:30pm", reminder: false}])

    const deleteTask=(id)=>{
        setTasks(tasks.filter((task)=>task.id!==id))
    }

    const toggleReminder=(id)=>{
        setTasks(tasks.map((task)=> task.id===id?{...task, reminder: !task.reminder} : task))
    }

    return (
        <div className="container">
            <Header/>
            {tasks.length>0?(<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>):("No Tasks to show")}
        </div>
    );
};

export default App;
