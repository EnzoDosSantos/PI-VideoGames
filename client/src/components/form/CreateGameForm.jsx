import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCache, createGame, getAllGames, getAllGenres } from "../../redux/actions";
import Loading from "../loading/Loading";
import styles from './CreateGameForm.module.css'


const CreateGameForm = () => {
    
    const games = useSelector(state => state.games)
    const db = games.filter(e => e.createdInDB === true)
    const [value, setValue] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: [],
        image: ""
    })

    const [error, setError] = useState({})
 
    const validate = (value) => {
        let error = {}
        if(value.name.trim().length === 0){
            error.name = "Enter a name"
            return error
        }
        if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(value.image)){
            setValue({
                ...value,
                image : ""
            })
        }
        let search = db.find(e => e.name.toLowerCase() === value.name.toLowerCase())
        if(search){
            error.name = "The game already exists"
            return error
        }
        if(value.description.trim().length === 0){
            error.description = "Enter a description"
            return error
        }
        if(value.platforms.length === 0 || !value.platforms){
            error.platforms = "Select a platform"
            return error
        }
        if(value.rating === "" || value.rating < 0 || value.rating > 5){
            error.rating = "The rating must be between 0 and 5"
            return error
        }
        if(value.genres.length === 0 || !value.genres){
            error.genres = "Enter a genre"
            return error
        }
        if(!value.released){
            error.released = "Enter a released date"
            return error
        }
        return error
    }


    const handlleSubmit = (e) => {
        e.preventDefault()
            dispacth(createGame(value))
            setValue({
                name: "",
                description: "",
                released: "",
                rating: 0,
                platforms: [],
                genres: [],
                image: ""
            })
        alert("Game created successfully!!")
    }


    const checkGenres = (e) => {
        setValue({
          ...value,
          genres: value.genres.includes(e.target.value)?
          value.genres
          :
          [...value.genres, e.target.value]
        })
        setError(validate({
            ...value,
            genres: value.genres.includes(e.target.value)?
            value.genres
            :
            [...value.genres, e.target.value]
        }))
      }
    
      const checkPlatforms = (e) => {
        setValue({
          ...value,
          platforms: value.platforms.includes(e.target.value)? 
          value.platforms
          :
          [...value.platforms, e.target.value]
        })
        setError(validate({
            ...value,
            platforms: value.platforms.includes(e.target.value)? 
            value.platforms
            :
            [...value.platforms, e.target.value] 
        }))
      }


    const handlleChange = (e) => {
        setValue({
            ...value,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...value,
            [e.target.name] : e.target.value
        }))
    }

    const filterGenres = (e) => {
        let newGenres = value.genres.filter(i => i !== e.target.value)
        setValue({
            ...value,
            genres: newGenres
        })
        setError(validate({
            ...value,
            genres: newGenres
        }))
    }

    const filterPlatfroms = (e) => {
        let newPlatforms = value.platforms.filter(i => i !== e.target.value)
        setValue({
            ...value,
            platforms: newPlatforms
        })
        setError(validate({
            ...value,
            platforms: newPlatforms
        }))
    }
 
    const dispacth = useDispatch()

    useEffect(() => {
        dispacth(getAllGenres())
        dispacth(getAllGames())
        return () => {
            dispacth(clearCache())
        }
    }, [dispacth])


    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    return (

            games.length === 0?
            <Loading/>
            :
            <div className={styles.formConteiner}>
            <div className={styles.formConteinerData}>
            <Link className={styles.back} to="/home">Go back home</Link>
            <form>
                <div className={styles.name}>
                <label>Insert a name: </label>
                <input autoComplete="off" type="text" placeholder="name" name="name" value={value.name} onChange={(e) => handlleChange(e)}></input>
                {
                    error.name && <p className={styles.error}>{error.name}</p>
                }
                </div>
                <div className={styles.genresC}>
                <label>Selected genres: </label>
                <select defaultValue="Genres" id="genres" name="genres" onChange={(e) => checkGenres(e)}>
                <option disabled={true}>Genres</option>
            {
                genres.map(e => 
                <option key={e.id} value={e.id}>
                    {e.name}
                </option>
                )
            }
                </select>
                {
                        error.genres && <p className={styles.error}>{error.genres}</p>
                }
                </div>
                <div className={styles.platformsC}>
                <label>Selected platforms: </label>
                <select id="platforms" defaultValue="Platforms" name="platforms" onChange={(e) => checkPlatforms(e)}>
                <option disabled={true}>Platforms</option>
                    {
                        platforms.map(e =>
                        <option key={e} value={e}>
                            {e}
                        </option>
                        )
                    }
                </select>
                {
                        error.platforms && <p className={styles.error}>{error.platforms}</p>
                }
                </div>
                <div className={styles.description}>
                <label>Insert a description: </label>
                <input autoComplete="off" type="text" placeholder="description" name="description" value={value.description} onChange={(e) => handlleChange(e)}></input>
                {
                        error.description && <p className={styles.error}>{error.description}</p>
                }
                </div>
                <div className={styles.rating}>
                <label>Insert a rating: </label>
                <input type="number" placeholder="rating" name="rating" value={value.rating} onChange={(e) => handlleChange(e)}></input>
                {
                        error.rating && <p className={styles.error}>{error.rating}</p>
                }
                </div>
                <div className={styles.release}>
                <label>Insert a release day: </label>
                <input type="date" name="released" value={value.released} onChange={(e) => handlleChange(e)}></input>
                {
                        error.released && <p className={styles.error}>{error.released}</p>
                }
                </div>
                <div className={styles.img}>
                <label>Insert a image URL: </label>
                <input autoComplete="off" type="text" name="image" placeholder="Paste a img URL" value={value.image} onChange={(e) => handlleChange(e)}></input>
                </div>
                <button className={styles.btn} type="submit" disabled={!value.name || Object.keys(error).length > 0} onClick={(e) => handlleSubmit(e)}>Crear</button>
        </form>
        </div>

        <div className={styles.conteinerGenres}>
        <div className={styles.selectedGenres}>Selected genres</div>
        <div className={styles.genres}>
        {
            value.genres?.map(e => {
                let genresSelected = genres.find(i => i.id === Number(e))
                return (
                    <button key={e} className={styles.btn3} value={genresSelected.id} type="button" onClick={(e) => filterGenres(e)}>{genresSelected.name}</button>
                )    
            })
        }
        </div>
        </div>
        <div className={styles.conteinerPlatforms}>
        <div className={styles.selectedPlatforms}>Selected platforms</div>
        <div className={styles.platforms}>
        {
            value.platforms?.map(e =>
                <button key={e} className={styles.btn2} value={e} type="button" onClick={(e) => filterPlatfroms(e)}>{e}</button>
            )
        }
        </div>
        </div>
    </div>
    )
}


export default CreateGameForm