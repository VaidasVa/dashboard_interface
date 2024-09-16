import styles from './CSS/nav.module.css'
import React, {useEffect, useState} from "react";

function Nav() {
    const [city, setCity] = useState()
    const [temp, setTemp] = useState()
    const [icoUrl, setIcoUrl] = useState()

    let URL = "http://127.0.0.1:5000/api/v1";

    useEffect(() => {
        getWeather()},[])

    let getWeather = async() => {
        try{
            let response = await fetch(URL + "/getCurrentWeather", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response.status);
            let result = await response.json();

            console.log(result);
            setCity(result.city)
            setTemp(result.temperature)
            setIcoUrl(result.iconUrl)
        }
        catch(error){
            console.log(error);
        }
    }

        return (<div className={styles.nav}>
            <div className={styles.navTitle}>
                Dashboard Navbar
            </div>
            <div className={styles.navWeather}>
                <div className={styles.temp}>
                    <span>{city}, {temp}℃</span>
                <img className={styles.weatherIco} src={icoUrl} alt={""} />
                </div>
                <div></div>
            </div>
        </div>)

}

export default Nav;