import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { clearCache, getAllGames } from "../../redux/actions";
import styles from './Error404.module.css'

const Error404 = () => {
    const dispatch = useDispatch()
    const error = useSelector(state => state.allGames)
    
    const handlleClick = () => {
        dispatch(clearCache())
        dispatch(getAllGames())
    }

    return (
        <div className={styles.conteinerError}>
        <h3 className={styles.error}>{error.error}</h3>
        <button className={styles.errorBtn} onClick={() => handlleClick()}>Go Back Home</button>
        </div>
    )
}

export default Error404