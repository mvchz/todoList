import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Route} from "react-router-dom";

import {AddList, List, Tasks} from './components'
import * as axios from "axios";

import {GiUbisoftSun} from 'react-icons/all';
import {AiOutlineMenu} from 'react-icons/all';
import {IoIosMoon} from 'react-icons/all';

const App = () => {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [changeTheme, setChangeTheme] = useState(true);
    
    const toogleTheme = () => {
        setChangeTheme(!changeTheme);
        console.log(changeTheme);
    }

    let history = useHistory();

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

    const onEditTask = (listId, taskObj) => {
        const newTaskText = window.prompt('Text task', taskObj.text);
        if(!newTaskText){
            return;
        }
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskObj.id) {
                        task.text = newTaskText
                    }
                    return task;
                })
            }
            return list;
        });
        setLists(newList);
        axios.patch(`http://localhost:3001/tasks/${taskObj.id}`, {
            text: newTaskText
        })
            .catch(() => {
                alert(`can't change a task`);
            })
    };

    const onRemoveTask = (listId, taskId) => {
        if (window.confirm('Are you really wanna delete task?')) {
            const newList = lists.map(item => {
                if (item.id === listId) {
                    item.tasks = item.tasks.filter(task => task.id !== taskId)
                }
                return item;
            });
            setLists(newList);
            axios.delete(`http://localhost:3001/tasks/${taskId}`)
                .catch(() => {
                    alert(`can't find a task`);
                })
        }
    };

    const onAddTask = (listId, taskObj) => {
        const newList = lists.map(item => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        });
        setLists(newList);
    };

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskId) {
                        task.completed = completed
                    }
                    return task;
                })
            }
            return list;
        });
        setLists(newList);
        axios.patch(`http://localhost:3001/tasks/${taskId}`, {
            completed
        })
            .catch(() => {
                alert(`failed to update a task`);
            })
    }

    const onEditListTitle = (id, title) => {
        const newList = lists.map(item => {
            if (item.id === id) {
                item.name = title;
            }
            return item;
        });
        setLists(newList);
    };

    useEffect(() => {
        const listId = history.location.pathname.split('lists/')[1];
        if (lists) {
            const list = lists.find(list => list.id === Number(listId));
            setActiveItem(list);
        }
    }, [lists, history.location.pathname]);

    const theme = changeTheme;
    return (
            <div className={ changeTheme && "todo" || "todos"}>
            <div className={ changeTheme && "todo__sidebar" || "todos__sidebar"}>
                <List onClickItem={() => {
                    history.push(`/`);
                }}
                      items={[
                          {
                              icon: <AiOutlineMenu/>,
                              name: 'All tasks',
                              active: history.location.pathname === '/'
                          }
                      ]}/>
                {lists ? (<List
                    items={lists}
                    onRemove={id => {
                        const newLists = lists.filter(item => item.id !== id);
                        setLists(newLists);
                    }}
                    onClickItem={list => {
                        history.push(`/lists/${list.id}`);
                    }}
                    activeItem={activeItem}
                    theme={theme}
                    isRemovable
                />) : ('Download...')}
                <AddList theme={theme} onAdd={onAddList} colors={colors}/>
            </div>
            <div className={"todo__tasks"}>
                <div onClick={toogleTheme} className='day_night__theme'>
                    {changeTheme ?
                    <span><GiUbisoftSun></GiUbisoftSun></span>
                    : <span><IoIosMoon></IoIosMoon></span>
                    }
                </div>
                <Route exact path="/">
                    {lists && lists.map(list => (
                        <Tasks onEditTitle={onEditListTitle}
                               onAddTask={onAddTask}
                               key={list.id}
                               list={list}
                               withoutEmpty
                               onRemoveTask={onRemoveTask}
                               onEditTask={onEditTask}
                                onCompleteTask={onCompleteTask}
                        />))}
                </Route>
                <Route path={'/lists/:id'}>
                    {lists && activeItem
                    && <Tasks onEditTitle={onEditListTitle}
                              onAddTask={onAddTask}
                              list={activeItem}
                              onRemoveTask={onRemoveTask}
                              onEditTask={onEditTask}
                              onCompleteTask={onCompleteTask}
                    />}
                </Route>

            </div>
        </div>
        
    );
};

export default App;
