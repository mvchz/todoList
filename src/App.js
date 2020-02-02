import React from 'react';
import {AiOutlineMenu} from 'react-icons/all';
import List from "./components/List/List";
import AddList from "./components/List/AddList/AddList";

import DB from './db/db';

const App = () => {
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
                <List items={[
                    {
                        color: 'green',
                        name: 'For buy',
                        active: true
                    },
                    {
                        color: 'blue',
                        name: 'Frontend'
                    },
                    {
                        color: 'pink',
                        name: 'Movie and serials'
                    },
                ]}
                       isRemovable
                />
                <AddList colors={DB.colors}/>
            </div>
            <div className={"todo__tasks"}>
            </div>
        </div>
    );
};

export default App;
