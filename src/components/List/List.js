import React, {Fragment} from 'react';
import classNames from 'classnames';
import './List.scss';
import Badge from "./Badge/Badge";
import {IoIosCloseCircle} from "react-icons/all";

const List = ({items, isRemovable, onClick, onRemove}) => {

    const removeList = (item) => {
        if (window.confirm('You really wanna delete list')){
            onRemove(item)
        }
    };

    return (
        <Fragment>
            <ul onClick={onClick} className="list">
                {
                    items.map((item, index) =>
                        <li key={index}
                            className={classNames(item.className, {'active': item.active})}>
                            <i>{item.icon ?(
                                item.icon) :(
                                <Badge color={item.color}/>)}
                            </i>
                            <span>{item.name}</span>
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