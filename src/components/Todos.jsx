import React, {useEffect, useState} from 'react';
import styles from './CSS/todos.module.css';

function Todos() {
    const [data, setData] = useState([]);
    const URL = "http://localhost:8088/api/v1/todo/";

    useEffect(() => {
        todoList();
    }, []);

    let todoList = async () => {
        try {
            let response = await fetch(URL + 'all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            setData(result.reverse().sort((a, b) => a.status - b.status));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    let handleNewToDo = async (e) => {
        e.preventDefault();
        let newTodoContent = document.getElementById("todoNew").value;

        if (!newTodoContent) {
            console.log("Empty Todo input");
            return;
        }

        try {
            let response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newTodoContent })
            });

            if (response.ok) {
                await todoList();
                document.getElementById("todoNew").value = '';
            }
        } catch (error) {
            console.error('Error saving new todo:', error);
        }
    };

    async function handleChangeStatus(id){
        let found = data.filter(item => item.id === id)[0];
        try{
            let response = await fetch(URL+id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, status: !found.status })
            });

            if (response.ok) {
                await todoList();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id){
        try{
            let response = await fetch(URL+id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                await todoList();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={styles.todoContainer}>
            <p className={styles.subtitle}>ToDo List</p>
            <div className={styles.newTodo}>
                <form onSubmit={handleNewToDo}>
                    <input id="todoNew" placeholder="New to do"/>
                    <button type="submit">Add</button>
                </form>
            </div>
            <div className={"card"}>
                {data.map(item => (
                    <div key={item.id} className={"card"} style={{"backgroundColor" : "rgba(240,240,240,0.7)"}}>
                        <p className={styles.todoItem} >
                            <div className={styles.todoItemMain}>
                                <input type={"checkbox"} id={item.id} checked={item.status} onChange={() => handleChangeStatus(item.id)} /> &nbsp;
                                <label htmlFor={item.id}> {item.content} </label>
                            </div>
                            <div className={styles.trash}>
                                <span id={"trashItem"} className={styles.trashItem} onClick={() => handleDelete(item.id)}>🗑️</span></div>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todos;