import React from 'react';
import {FaCheck, IoIosCloseCircle, MdModeEdit} from "react-icons/all";

const Task = ({id, text, onEdit, completed, list, onRemove, onComplete}) => {
    const onChangeCheckbox = (e) => {
        onComplete(list.id, id, e.target.checked);
    }

    return (
        <>
            <div key={id} className='tasks__items-row'>
                <div className="checkbox">
                    <input onChange={onChangeCheckbox}
                        id={`task-${id}`}
                        type="checkbox"
                        checked={completed}
                      />
                    <label htmlFor={`task-${id}`}>
                        <FaCheck className='tick'/>
                    </label>
                </div>
                <p>{text}</p>
                <div className="tasks__items-row-actions">
                    <div onClick={() => onEdit(list.id, {id, text})}>
                        <span><MdModeEdit></MdModeEdit></span>
                    </div>
                    <div onClick={() => onRemove(list.id, id)}>
                        <span><IoIosCloseCircle></IoIosCloseCircle></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Task;