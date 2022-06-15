import React from "react";
import loading from '../../assets/loading.gif'
import styles from './Loading.module.css'

const Loading = () => {
    return (
        <div className={styles.image}>
        <img width={300} height={300} src={loading} alt="loading"/>
        </div>
    )
}

export default Loading