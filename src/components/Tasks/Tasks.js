import React from 'react';

import './Tasks.scss';
import {FaCheck, FiEdit3} from "react-icons/all";

const Tasks = () => {
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                Frontend
                <span><FiEdit3/></span>
            </h2>
            <div className="tasks__items">
                <div className='tasks__items-row'>
                    <div className="checkbox">
                        <input id='check' type="checkbox"/>
                        <label htmlFor="check">
                            <FaCheck className='tick'/>
                        </label>
                    </div>
                    <input value={"ReactJS Hooks (useState, useReducer, useEffect etc.)"} />
                </div>
            </div>
        </div>
    );
};

export default Tasks;