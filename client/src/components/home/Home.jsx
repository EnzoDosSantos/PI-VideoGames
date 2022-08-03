import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { clearCache } from "../../redux/actions";
import styles from "./Home.module.css"
import gitImg from '../../assets/github.png'
import linkImg from '../../assets/linkedin.png'

const Home = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(clearCache())  
    },[dispatch])

    return (
        <div className={styles.home}>
            <h2 className={styles.homeText}>APP GAMERY</h2>
            <Link to="/home">
            <h4 className={styles.homeLink}>CLICK HERE!</h4>
            </Link>
            <div className={styles.homeLinks}>
            <a href="https://github.com/EnzoDosSantos" target="_blank">
            <img className={styles.imgGit} src={gitImg} alt="lol"/>
            </a>
            <a href="https://www.linkedin.com/in/enzo-facundo-dos-santos-2973b323a/" target="_blank">
            <img className={styles.imgLink} src={linkImg} alt="lol"/>
            </a>
            </div>
        </div>
    )
}

export default Home
