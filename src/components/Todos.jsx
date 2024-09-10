import React, { useEffect, useState } from 'react';
import styles from './CSS/todos.module.css';

function Todos() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/todo/all',{
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        })
            .then(response => {
                console.log(response)
                console.log(response.status)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={styles.todoContainer}>
            <div>
            <p className={styles.subtitle}>ToDo List</p>
            {data.map(item => (
                <div key={item.id} className={"card"}>
                    <p>Content: {item.content},
                    {/*<p>Created: {item.created}</p>*/}
                    {/*<p>Updated: {item.updated}</p>*/}
                        Done: {item.status ? "✅" : "️no"}

                    Deleted: {item.archived ? '✅' : 'No'}</p>
                </div>
            ))}
            </div>
            <div>
New Item add
            </div>
        </div>
    );
}

export default Todos;