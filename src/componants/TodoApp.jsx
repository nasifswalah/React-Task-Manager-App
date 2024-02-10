import React, { useState } from 'react'
import './TodoApp.css'

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    function addTask() {
        if (inputValue.length === 0) {
            return;
        }

        setTasks([
            ...tasks,
            {
                content: inputValue,
                isComplete: false,
                isEditing: false
            }
        ]);

        setInputValue("");
    }

    function deleteTask(index) {
        tasks.splice(index, 1)
        setTasks([
            ...tasks
        ])
    }

    function taskCompleted(index) {
        tasks[index].isComplete = !tasks[index].isComplete;
        setTasks([
            ...tasks
        ])
    }

    function editTask(index) {
        tasks[index].isEditing = true;
        setTasks(
            [...tasks]
        )
    }

    function updateTask(index, value) {
        tasks[index].content = value;
        setTasks(
            [...tasks]
        )
    }

    function saveTask(index) {
        tasks[index].isEditing = false;
        setTasks(
            [...tasks]
        )
    }

    return (
        <div className='task-Manager'>
            <h1><b>Task Manager</b></h1>
            <div className='tasks'>
                {
                    tasks.sort((n) => n.isComplete ? 1 : -1).map(
                        (task, index) => <div key={index} className={"task " + (task.isComplete ? "complete" : "inComplete")}>
                            <input type="checkbox" checked={task.isComplete} onChange={() => taskCompleted(index)} />
                            {
                                task.isEditing ?
                                    <input className='input-Task' value={task.content} onChange={(event) => updateTask(index, event.target.value)} />
                                    :
                                    <span className='content'>
                                        {
                                            task.isComplete ?
                                                <del>{task.content}</del> :
                                                task.content
                                        }
                                    </span>


                            }
                            {
                                task.isEditing ?
                                    <button className='save' onClick={() => saveTask(index)} >Save</button> :
                                    <button className='edit' onClick={() => editTask(index)}>Edit</button>
                            }
                            <button className='delete' onClick={() => deleteTask(index)}>Delete</button>
                        </div>
                    )
                }
            </div>
            <div className='add-Content' >
                <input placeholder='Enter a task' value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                <button onClick={addTask}>Add Task</button>
            </div>
        </div>
    )
}

export default TodoApp