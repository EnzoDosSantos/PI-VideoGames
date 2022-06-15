import React from "react"
import noImage from "../../../assets/noImg.png"
import { Link } from 'react-router-dom';
import styles from './GamesCard.module.css'

const GamesCard = ({id, name, image, rating, genres}) => {
    return (
        <div>
            <Link to={`/game/${id}`}>
                <h4 className={styles.name}>{name}</h4>
                {

                image ?
                <img className={styles.img} src={image}alt="lol"/> 
                :
                <img className={styles.img} src={noImage}alt="lol"/>
                
                }
                </Link>
                <div className={styles.rating}>Rating {rating}</div>
                <div className={styles.genres}>Genres: </div>
                <div className={styles.allGenres}>{genres?.join(" | ")}</div>
        </div>
    )

}




export default GamesCard