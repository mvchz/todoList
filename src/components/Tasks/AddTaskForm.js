import React, {useState} from 'react';
import {MdAddCircle} from "react-icons/all";
import * as axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('')
    };

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        };
        setIsLoading(true);
        axios.post(`http://localhost:3001/tasks`, obj)
            .then(({data}) => {
                console.log(data);
                onAddTask(list.id, data);
                toggleFormVisible();
            }).catch(() => {
            alert('Trouble with adding task!')
        }).finally(() => {
            setIsLoading(false);
        });
    };
    return (
        <div className="tasks__form">
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <span className='icon'><MdAddCircle/></span>
                    <span className='icon-text'>New task</span>
                </div>) : (<div className="tasks__form-block">
                <input className={`field`}
                       value={inputValue}
                       onChange={e => setInputValue(e.target.value)}
                       type="text"
                       placeholder={'Task name'}
                />
                <button disabled={isLoading} onClick={addTask} className={`button`}>
                    {isLoading ? 'Adding...' : 'Add task'}
                </button>
                <button onClick={toggleFormVisible} className={`button button--grey`}>Cancel</button>
            </div>)}
        </div>
    );
};

export default AddTaskForm;