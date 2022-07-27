import React from "react"
import noImage from "../../../assets/noImg.png"
import { Link } from 'react-router-dom';
import styles from './GamesCard.module.css'

const GamesCard = ({ id, name, image, rating, genres }) => {
    return (
        <>
            <div className={styles.card}>

                {

                    image ?
                        <img className={styles.img} src={image} alt="lol" />
                        :
                        <img className={styles.img} src={noImage} alt="lol" />

                }
                <div className={styles.cardDetails}>
                    <p className={styles.textTitle}>{name}</p>
                    <p className={styles.textBody}>{genres?.join(" | ")}</p>
                    <p className={styles.textBody}>{rating}</p>
                </div>
                <Link to={`/game/${id}`}>
                    <button className={styles.cardButton}>More info</button>
                </Link>
            </div>
        </>
    )

}

export default GamesCard