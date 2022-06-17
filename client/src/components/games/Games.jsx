import React, { useEffect, useState } from 'react';
import GamesCard from "./gamesCard/GamesCard";
import { useSelector, useDispatch } from 'react-redux';
import { getAllGames, clearCache, orderName, orderRating, orderByLocation, getAllGenres, orderByGenres } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
import SearchBar from '../form/SearchBar';
import Error404 from '../error/Error404';
import Pagination from '../pagination/Pagination';
import styles from './Games.module.css';


const Games = () =>  {

    const page = useSelector(state => state.page)
    const gamePerPage = 15
    const [/*sort*/, setSort] = useState()
    const allGames = useSelector(state => state.allGames)
    const games = useSelector(state => state.games)
    const genres = useSelector(state => state.genres)
    const reload = useSelector(state => state.search)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllGames())
        dispatch(getAllGenres())
    },[dispatch])

    const handlleCLick =() =>{
        dispatch(getAllGames())
        dispatch(clearCache())
    }

    const handlleOrder = (e) => {
        dispatch(orderName(e.target.value))
        setSort(e.target.value)
    }

    const handlleSelect = (e) => {
        dispatch(orderRating(e.target.value))
        setSort(e.target.value)
    }

    const handlleSelectLocation = (e) => {
        dispatch(orderByLocation(e.target.value))
        setSort(e.target.value)
    }

    const handlleSelectGenres = (e) => {
        dispatch(orderByGenres(e.target.value))
        setSort(e.target.value)
    }

        let lastIndex =  page * gamePerPage
        let firstIndex = lastIndex - gamePerPage
        let currentGames = games.slice(firstIndex, lastIndex)



        return (
                allGames.error?
                <Error404/>
                
                :

                currentGames.length === 0? 
                <Loading/>
                
                :
            <div className={styles.conteinerGames}>
                <h1 className={styles.title}>APP GAMERY</h1>
                <div className={styles.titleConteiner}>
                <SearchBar/>
                {
                    reload === true?
                    <button className={styles.reload} onClick={ () => handlleCLick()}>Reload</button>
                    :
                     null
                }
                <div className={styles.create}>
                <Link to="/create">
                    <h4>Create a game</h4>
                </Link>
                </div>
                </div>
            <div className={styles.all}>
            <div className={styles.filterTitle}>Order by</div>
            <div className={styles.filterConteiner}>
            <select defaultValue="Alphabetical order" onChange={ (e) => handlleOrder(e)}>
              <option value='Alphabetical order' disabled>Alphabetical order</option>
              <option value='A-Z'>A-Z</option>
              <option value='Z-A'>Z-A</option>
            </select>

            <select defaultValue="Order by rating" onChange={ (e) => handlleSelect(e)}>
              <option value='Order by rating' disabled>Order by rating</option>
              <option value='Higher - lower'>Higher - lower</option>
              <option value='Lower - higher'>Lower - higher</option>
            </select>

            <select defaultValue="Order created" onChange={ (e) => handlleSelectLocation(e)}>
              <option value='Order created' disabled>Order created</option>
              <option value='All games' >All games</option>
              <option value='Created at db' >Created at db</option>
              <option value='Only api games'>Only api games</option>
            </select>

            <select defaultValue="Order by genres" onChange={ (e) => handlleSelectGenres(e)}>
              <option value="Order by genres" disabled>Order by genres</option>
              <option value="Default order">Default order</option>
              {
                  genres?.map(e => <option key={e.id} value={e.name}>{e.name}</option>)
              }
            </select>
            </div>
            </div>       
            <Pagination
            allGames={games.length}
            />
            <div className={styles.conteinerGamescard}>
                {
            currentGames?.map(e => 
                <div key={e.id}>
                <GamesCard
                    id={e.id}
                    name={e.name}
                    image={e.image}
                    rating={e.rating}
                    genres={e.genres}
                />
                </div>
                )
            }
            </div>

            <Pagination
            allGames={games.length}
            />
            </div>
        )
};

export default Games