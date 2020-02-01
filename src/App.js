import React from 'react';
import {AiOutlineMenu} from 'react-icons/all';
import List from "./components/List/List";

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
                ]}
                      isRemovable={true}
                />
                <List items={[
                {
                    color: 'green',
                    name: 'For buy'
                },
                {
                    color: 'blue',
                    name: 'Frontend'
                },
                {
                    color: 'pink',
                    name: 'Movie and serials'
                },
            ]}/>
            </div>
            <div className={"todo__tasks"}>
            </div>
        </div>
    );
};

export default App;
