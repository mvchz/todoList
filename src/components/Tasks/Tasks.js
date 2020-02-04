import React from 'react';

import './Tasks.scss';
import {FaCheck, FiEdit3} from "react-icons/all";

const Tasks = ({list}) => {
    console.log(list);
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {list.name}
                <span><FiEdit3/></span>
            </h2>
            <div className="tasks__items">
                {
                    list.tasks.map(task =>
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
            </div>
        </div>
    );
};

export default Tasks;