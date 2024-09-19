import styles from "./CSS/newsLrt.module.css"
import React, {useEffect, useState} from "react";

function NewsLrt(){
    const [news, setNews] = useState([]);
    const URL = "http://127.0.0.1:5000/api/v1/news";

    useEffect(() => {
        getNews();}, [])

    let getNews = async () => {
        try {
            let response = await fetch(URL , {
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
            setNews(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching NOTES data:', error);
        }
    }

    return(<div className={styles.newsContainer}>
            <p className={styles.subtitle}>Headlines from LRT</p>
            <div>
                {news.map(item => (
                    <a key={item.title} href={item.url} target="_blank" >
                        <div key={item.title} className={"card " + styles.card}>
                            <span>{item.category} : {item.title}</span>
                    </div>
                    </a>
                ))}
            </div>
    </div>
    )
}

export default NewsLrt