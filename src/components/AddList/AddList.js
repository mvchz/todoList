import React, {useEffect, useState} from 'react';
import {IoIosCloseCircle, MdAdd} from "react-icons/all";
import List from "../List/List";
import Badge from "../Badge/Badge";
import * as axios from 'axios'
import './AddList.scss'

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue("");
        selectColor(colors[0].id)
    };

    const addList = () => {
        if (!inputValue) {
            alert('Enter list name');
            return;
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists', {name: inputValue, colorId: selectedColor})
            .then(({data}) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name;
                const listObj = {...data, color: {name: color}};
                onAdd(listObj);
                onClose();
            }).catch(() => {
            alert('Trouble with adding list!')
        }).finally(() => {
            setIsLoading(false);
        });
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
                <div onClick={() => onClose()} className={"add-list__popup-close-btn"}><IoIosCloseCircle/></div>
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
                <button onClick={addList} className={`button`}>
                    {isLoading ? 'Adding...' : 'Add'}
                </button>
            </div>}
        </>
    );
};

export default AddList;