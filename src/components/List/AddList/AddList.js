import React, {useState} from 'react';
import {IoIosCloseCircle, MdAdd} from "react-icons/all";
import List from "../List";
import Badge from "../Badge/Badge";

import './AddList.scss'

const AddList = ({colors}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);

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
                <div onClick={() => setVisiblePopup(false)} className={"add-list__popup-close-btn"}><IoIosCloseCircle /> </div>
                <input className={`field`} type="text" placeholder={'List Name'}/>
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
                <button className={`button`}>Add</button>
            </div>}
        </>
    );
};

export default AddList;