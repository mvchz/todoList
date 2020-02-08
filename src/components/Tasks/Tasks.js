import React, { useState } from 'react';

import './Tasks.scss';
import {FiEdit3} from "react-icons/all";
import * as axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import {Link} from 'react-router-dom'

const Tasks =
    ({
         list,
         onEditTitle,
         onAddTask,
         withoutEmpty,
         onRemoveTask,
         onCompleteTask,
         onEditTask}) => {
    

        const editTitle = () => {
            const newTitle = window.prompt('Name of list', list.name);
            if (newTitle) {
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
                <Link to={`/lists/${list.id}`}>     
                <h2 style={{color: list.color.hex}} className="tasks__title">
                    {list.name}
                    <span onClick={editTitle}><FiEdit3/></span>
                </h2>
                </Link>

                <div className="tasks__items">
                    {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Tasks not Found</h2>}
                    {list.tasks && list.tasks.map(task =>
                        <Task key={task.id}
                              {...task}
                              list={list}
                              onComplete={onCompleteTask}           
                              onRemove={onRemoveTask}
                              onEdit={onEditTask}
                        />)}
                    <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
                </div>
            </div>
        );
    };

export default Tasks;