import React from 'react';

import './Tasks.scss';
import {FaCheck, FiEdit3} from "react-icons/all";
import * as axios from "axios";
import AddTaskForm from "./AddTaskForm";

const Tasks = ({list, onEditTitle, onAddTask}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Name of list', list.name);
        if(newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch(`http://localhost:3001/lists/${list.id}`, {
                name: newTitle
            }).catch(() => {
                alert('Failed to update list name')
            })
        }
    };


    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {list.name}
                <span onClick={editTitle}><FiEdit3/></span>
            </h2>
            <div className="tasks__items">
                {!list.tasks.length && <h2>Tasks not Found</h2>}
                {list.tasks.map(task =>
                        <div key={task.id} className='tasks__items-row'>
                            <div className="checkbox">
                                <input id={`task-${task.id}`} type="checkbox"/>
                                <label htmlFor={`task-${task.id}`}>
                                    <FaCheck className='tick'/>
                                </label>
                            </div>
                            <input readOnly value={task.text} />
                        </div>)
                }
                <AddTaskForm list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    );
};

export default Tasks;