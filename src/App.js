import React, {useEffect, useState} from 'react';
import {AiOutlineMenu} from 'react-icons/all';
import {AddList, List, Tasks} from './components'
import * as axios from "axios";

const App = () => {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
                setLists(data);
            console.log(data);
        });
        axios.get('http://localhost:3001/colors').then(({data}) => {
                setColors(data);
            })
    }, []);

    const onAddList = (obj) => {
        const newList = [...lists, obj];
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
                { lists ? (<List
                        items={lists}
                        onRemove={id => {
                          const newLists = lists.filter(item => item.id !== id);
                          setLists(newLists);
                          console.log(newLists,lists);
                      }}
                      isRemovable
                />) : ('Download...')}
                <AddList onAdd={onAddList} colors={colors}/>
            </div>
            <div className={"todo__tasks"}>
                { lists && <Tasks list={lists[1]}/>}
            </div>
        </div>
    );
};

export default App;
