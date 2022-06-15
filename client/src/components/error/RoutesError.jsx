import React from "react";
import { Link } from "react-router-dom";
import styles from './RoutesError.module.css'
import img from '../../assets/routes.gif'

const RoutesError = () => {
    return (
        <div className={styles.containerError}>
        <h2 className={styles.title}>Nothing here</h2>
        <Link to="/">
        <h3 className={styles.back}>Go Back Home</h3>
        </Link>
        <img className={styles.img} src={img} alt="lol"/>
        </div>
    )
}

export default RoutesError