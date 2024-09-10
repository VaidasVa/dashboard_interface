import React, {useEffect, useState} from 'react';
import styles from './CSS/todos.module.css';

function Todos() {
    const [data, setData] = useState([]);
    const URL = "http://localhost:8080/api/v1/todo/";

    useEffect(() => fetchTodos)

    async function fetchTodos() {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}};
        try {
            const response = await fetch(URL+'all', options);
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
                    .then(data => setData(data));
            }}
        catch(error) {console.error('Error fetching data', error)}
    }

    async function handleNewToDo(e){
        e.preventDefault();
        let inputText = document.getElementById("todoNew").value;
        if(inputText === ""){
            console.log("Empty Todo input");
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({content: inputText})
            };
            try {
                const response = await fetch('http://localhost:8080/api/v1/todo/', requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                document.getElementById("todoNew").value = '';
            } catch (error) {
                console.error('Error saving new todo:', error);
            }
        }
    }

    return (
        <div className={styles.todoContainer}>
            <div>
                <p className={styles.subtitle}>ToDo List</p>
                {data.map(item => (
                    <div key={item.id} className={"card"}>
                        <p>{item.content}
                            {/*<p>Created: {item.created}</p>*/}
                            {/*<p>Updated: {item.updated}</p>*/}
                            {/*Done: {item.status ? "✅" : "️no"}*/}
                            {/*Deleted: {item.archived ? '✅' : 'No'}*/}
                        </p>
                    </div>
                ))}
            </div>
            <div className={styles.newTodo}>
                <form onSubmit={(e) => handleNewToDo(e)}>
                    <input id={"todoNew"} placeholder={"New to do"}></input>
                    <button id={"newTodoItem"}>Add</button>
                </form>
            </div>
        </div>
    );
}

export default Todos;