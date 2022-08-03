import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { clearCache, clearGameCache, getOneGame, deleteGame } from "../../../redux/actions";
import img from "../../../assets/noImg.png"
import Loading from "../../loading/Loading";
import RoutesError from "../../error/RoutesError";
import styles from './DetailGame.module.css'
import backImg from '../../../assets/back.png'


const DetailGame = () => {
    const history = useHistory();
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
        dispacth(clearCache())
        history.push("/home")
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
                            game.image ?
                                <img className={styles.gameImg} src={game.image} alt="lol" />
                                :
                                <img className={styles.gameImg} src={img} alt="lol" />
                        }
                    </div>
                    <div className={styles.conteinerbtn}>
                    {
                            game.createdInDB === true ?
                                // <button className={styles.deleteGameBtn} onClick={() => handlleDelete(id)}>Delete Game</button>
                                <button onClick={() => handlleDelete(id)} className={styles.deleteGameBtn}><span className={styles.text}>Delete</span><span className={styles.icon}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                                :
                                null
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