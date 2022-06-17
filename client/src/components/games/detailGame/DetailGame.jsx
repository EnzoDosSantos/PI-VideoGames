import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearCache, clearGameCache, getOneGame } from "../../../redux/actions";
import img from "../../../assets/noImg.png"
import Loading from "../../loading/Loading";
import RoutesError from "../../error/RoutesError";
import styles from './DetailGame.module.css'
import backImg from '../../../assets/back.png'


const DetailGame = () => {
    const {id} = useParams()
    const dispacth = useDispatch()

    useEffect(() => {
        dispacth(getOneGame(id))
        dispacth(clearCache())
        return () => {
            dispacth(clearGameCache())
        }
    }, [dispacth, id])

    const game = useSelector(state => state.game)
    

   return (
       game.msg? 
       <RoutesError/>
       :
       game.length === 0?
       <Loading/>
       :
       <div className={styles.conteinerGame}>
           <Link to="/home">
            <img className={styles.linkHome} src={backImg} alt="go back"/>
           </Link>
           <h2 className={styles.gameName}>{game.name}</h2>
           {
                 game.image? 
               <img className={styles.gameImg} src={game.image} alt="lol"/> 
                  :
               <img className={styles.gameImg} src={img} alt="lol"/>
           }
           <div>Game Rating</div>
           <div>{game.rating}</div>
           <div className={styles.description}>Game description</div>
           {
                game.description?
               <h5 className={styles.gameDescription}>{game.description}</h5>
                :
                <h5 className={styles.gameDescription}>No info available</h5>
           }

           <hr className={styles.hr}></hr>
        
           <div className={styles.conteinerData}>
           <div>
           <div className={styles.released}>Released at</div>
           {
                 game.released? 
                <h5 className={styles.gameReleased}>{game.released}</h5>
                 :
                 <div className={styles.gameReleased}>No info available</div>
           }
           </div>
           <div>
           <div className={styles.genres}>Game genres</div>
            {
               game.createdInDB === true ? 
               <div className={styles.gameGenres}>{game.genres?.map(e => e.name).join(" | ")}</div>
               :
               <div className={styles.gameGenres}>{game.genres?.map(e => e).join(" | ")}</div> 
            }
            </div>
            <div>
               <div className={styles.platforms}>Platforms supported</div>
               <div className={styles.gamePlatforms}>{game.platforms.map(e => e).join(" | ")}</div>
            </div>
       </div>
       </div>
   )
}

export default DetailGame