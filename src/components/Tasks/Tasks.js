import React from 'react';

import './Tasks.scss';
import {FiEdit3} from "react-icons/all";
import * as axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks =
    ({
         list,
         onEditTitle,
         onAddTask,
         withoutEmpty,
         onRemoveTask,
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
                <h2 style={{color: list.color.hex}} className="tasks__title">
                    {list.name}
                    <span onClick={editTitle}><FiEdit3/></span>
                </h2>
                <div className="tasks__items">
                    {!withoutEmpty && !list.tasks.length && <h2>Tasks not Found</h2>}
                    {list.tasks.map(task =>
                        <Task key={task.id}
                              {...task}
                              list={list}
                              onRemove={onRemoveTask}
                              onEdit={onEditTask}
                        />)}
                    <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
                </div>
            </div>
        );
    };

export default Tasks;