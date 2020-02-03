import React, {useState} from 'react';
import {IoIosCloseCircle, MdAdd} from "react-icons/all";
import List from "../List";
import Badge from "../Badge/Badge";

import './AddList.scss'

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue("");
        selectColor(colors[0].id)
    };

    const addList = () => {
        if(!inputValue) {
            alert('Enter list name');
            return;
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        onAdd({id: Math.random(), name: inputValue, color});
        onClose();
    };
    return (
        <>
            <List onClick={() => setVisiblePopup(!visiblePopup)} items={[
                {
                    className: 'list__add-button',
                    icon: <MdAdd/>,
                    name: 'Add list'
                }
            ]}
            />
            {visiblePopup && <div className='add-list__popup'>
                <div onClick={() => onClose()} className={"add-list__popup-close-btn"}><IoIosCloseCircle /> </div>
                <input value={inputValue}
                       onChange={e => setInputValue(e.target.value)}
                       className={`field`}
                       type="text"
                       placeholder={'List Name'}
                />
                <div className={'add-list__popup-colors'}>
                    {
                        colors.map(color => (
                            <Badge onClick={() => selectColor(color.id)}
                                   key={color.id}
                                   color={color.name}
                                   className={selectedColor === color.id && 'active'}
                            />
                            ))}
                </div>
                <button onClick={addList} className={`button`}>Add</button>
            </div>}
        </>
    );
};

export default AddList;