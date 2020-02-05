import React, {Fragment} from 'react';
import classNames from 'classnames';
import './List.scss';
import Badge from "../Badge/Badge";
import {IoIosCloseCircle} from "react-icons/all";
import * as axios from "axios";

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

    const removeList = (item) => {
        if (window.confirm('You really wanna delete list')){
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
               onRemove(item.id);
            })
        }
    };

    return (
        <Fragment>
            <ul onClick={onClick} className="list">
                {
                    items.map((item, index) =>
                        <li key={index}
                            className={classNames(item.className, {
                                active: item.active
                                    ? item.active
                                    : activeItem && activeItem.id === item.id})}
                            onClick={onClickItem ? () => onClickItem(item) : null}
                        >
                            <i>{item.icon
                                ? (item.icon)
                                :(<Badge color={item.color.name}/>)}
                            </i>
                            <span>{item.name}{item.tasks && `(${item.tasks.length})`}</span>
                            {isRemovable &&
                            <div onClick={() => removeList(item)} className='list__remove-icon'>
                                <IoIosCloseCircle/>
                            </div>}
                        </li>)
                }
            </ul>
        </Fragment>
    );
};

export default List;