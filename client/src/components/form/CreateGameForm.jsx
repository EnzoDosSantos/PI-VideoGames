import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearCache, createGame, getAllGames, getAllGenres } from "../../redux/actions";
import Loading from "../loading/Loading";
import styles from './CreateGameForm.module.css'


const CreateGameForm = () => {
    const games = useSelector(state => state.games)
    const history = useHistory()
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
        }
        if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(value.image)){
            setValue({
                ...value,
                image : ""
            })
        }
        let search = games.find(e => e.name.toLowerCase() === value.name.toLowerCase())
        if(search){
            error.name = "The game already exists"
        }
        if(value.description.trim().length === 0){
            error.description = "Enter a description"
        }
        if(value.platforms.length === 0){
            error.platforms = "Select a platform"
        }
        if(value.rating < 0 || value.rating > 5){
            error.rating = "The rating must be between 0 and 5"
        }
        if(value.rating === ""){
            setValue({
                ...value,
                rating: 0
            })
        }
        if(value.genres.length === 0){
            error.genres = "Enter a genre"
        }
        if(!value.released){
            error.released = "Enter a released date"
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
        history.push("/home")
        alert("Game created successfully!!")
    }


    const checkGenres = (e) => {
        setValue({
          ...value,
          genres: value.genres.includes(e.target.value)?
           value.genres 
          : [...value.genres, e.target.value]
        })
      }
    
      const checkPlatforms = (e) => {
        setValue({
          ...value,
          platforms: value.platforms.includes(e.target.value)? 
          value.platforms 
          : [...value.platforms, e.target.value]
        })
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
    }

    const filterPlatfroms = (e) => {
        let newPlatforms = value.platforms.filter(i => i !== e.target.value)
        setValue({
            ...value,
            platforms: newPlatforms
        })
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
                <select id="platforms" name="platforms" onChange={(e) => checkPlatforms(e)}>
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
                <input autoComplete="off" type="text" name="image" placeholder="image" value={value.image} onChange={(e) => handlleChange(e)}></input>
                {
                        error.image && <p className={styles.error}>{error.image}</p>
                }
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
                    <div key={e}>
                    <div>{genresSelected.name}</div>
                    <button className={styles.btn} value={genresSelected.id} type="button" onClick={(e) => filterGenres(e)}>Delete</button>
                    </div>
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
                <div key={e}> 
                <div>{e}</div>
                <button className={styles.btn} value={e} type="button" onClick={(e) => filterPlatfroms(e)}>Delete</button>
                </div>
            )
        }
        </div>
        </div>
    </div>
    )
}


export default CreateGameForm