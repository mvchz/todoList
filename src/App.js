import React, {useState} from 'react';
import {AiOutlineMenu} from 'react-icons/all';
import List from "./components/List/List";
import AddList from "./components/List/AddList/AddList";

import DB from './db/db';
import Tasks from "./components/Tasks/Tasks";

const App = () => {
    const [lists, setLists] = useState(
        DB.lists.map(item => {
            item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
            return item;
        })
    );
    const onAddList = (obj) => {
        const newList = [...lists,obj];
        setLists(newList);
    };

    return (
        <div className="todo">
            <div className={"todo__sidebar"}>
                <List items={[
                    {
                        icon: <AiOutlineMenu/>,
                        name: 'All tasks',
                        active: true
                    }
                ]}/>
                <List items={lists}
                      onRemove={list => {
                          console.log(list);
                      }}
                      isRemovable
                />
                <AddList onAdd={onAddList} colors={DB.colors}/>
            </div>
            <div className={"todo__tasks"}>
                <Tasks />
            </div>
        </div>
    );
};

export default App;
