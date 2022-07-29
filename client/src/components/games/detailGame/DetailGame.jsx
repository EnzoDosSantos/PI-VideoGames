import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearCache, clearGameCache, getOneGame, deleteGame } from "../../../redux/actions";
import img from "../../../assets/noImg.png"
import Loading from "../../loading/Loading";
import RoutesError from "../../error/RoutesError";
import styles from './DetailGame.module.css'
import backImg from '../../../assets/back.png'


const DetailGame = () => {
    const { id } = useParams()
    const dispacth = useDispatch()

    useEffect(() => {
        dispacth(getOneGame(id))
        dispacth(clearCache())
        return () => {
            dispacth(clearGameCache())
        }
    }, [dispacth, id])

    const game = useSelector(state => state.game)
    const handlleDelete = (id) => {
        dispacth(deleteGame(id))
        alert("Game successfully removed")
    }

    return (
        game.msg ?
            <RoutesError />
            :
            game.length === 0 ?
                <Loading />
                :
                <>
                    <div className={styles.conteinerGame}>
                        <div className={styles.back}>
                            <Link to="/home">
                                <img src={backImg} alt="go back" />
                            </Link>
                            <div className={styles.gameName}>{game.name}</div>
                        </div>
                        {
                            game.createdInDB === true ?
                                <button onClick={() => handlleDelete(id)}>Delete Game</button>
                                :
                                null
                        }
                        {
                            game.image ?
                                <img className={styles.gameImg} src={game.image} alt="lol" />
                                :
                                <img className={styles.gameImg} src={img} alt="lol" />
                        }
                    </div>
                    <div className={styles.conteinerRating}>
                        <div className={styles.ratingra}>Game rating</div>
                        <div className={styles.rating}>🏆{game.rating}</div>
                        <div className={styles.description}>Game description</div>
                        {
                            game.description ?
                                <textarea className={styles.gameDescription}>{game.description}</textarea>
                                :
                                <textarea className={styles.gameDescription}>No info available</textarea>
                        }
                    </div>
                    <div className={styles.conteinerReleased}>
                        <div className={styles.released}>Release Date</div>
                        {
                            game.released ?
                                <div className={styles.gameReleased}>📅{game.released}</div>
                                :
                                <div className={styles.gameReleased}>No info available</div>
                        }
                    </div>
                    <div className={styles.conteinerGenresPlatforms}>
                    <div className={styles.conteinerGenres}>
                        <div className={styles.genres}>Game genres</div>
                        {
                            game.createdInDB === true ?
                                <div className={styles.gameGenres}>{game.genres?.map(e => e.name).join(" | ")}</div>
                                :
                                <div className={styles.gameGenres}>{game.genres?.map(e => e).join(" | ")}</div>
                        }
                    </div>
                    <div className={styles.conteinerPlatforms}>
                        <div className={styles.platforms}>Platforms supported</div>
                        <div className={styles.gamePlatforms}>{game.platforms.map(e => e).join(" | ")}</div>
                    </div>
                    </div>
                </>
    )
}

export default DetailGame