import axios from "axios"

export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const GET_ONE_GAME = "GET_ONE_GAME"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME"
export const CREATE_GAME = "CREATE_GAME"
export const CLEAR_CACHE = "CLEAR_CACHE"
export const CLEAR_GAME_CACHE = "CLEAR_GAME_CACHE"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const ORDER_BY_RATING = "ORDER_BY_RATING"
export const ORDER_BY_LOCATION = "ORDER_BY_LOCATION"
export const ORDER_BY_GENRES = "ORDER_BY_GENRES"

export const getAllGames = () => (dispatch) => {
    fetch("http://localhost:3001/videogames")
    .then(res => res.json())
    .then(payload =>  dispatch({type: GET_ALL_GAMES, payload: payload}))
    .catch(e => console.log(e))
}


export const getOneGame = (id) => (dispatch) => {
    let error = {error: "No results found"}
    fetch(`http://localhost:3001/videogame/${id}`)
    .then(res => res.json())
    .then(payload => dispatch({type: GET_ONE_GAME, payload: payload}))
    .catch(() => dispatch({type: GET_ONE_GAME, payload: error}) )
}


export const getGamesByName = (name) => (dispatch) => {
    fetch(`http://localhost:3001/videogames?search=${name}`)
    .then(res => res.json())
    .then(payload => dispatch({type: GET_GAMES_BY_NAME, payload: payload}))
    .catch(e => console.log(e))
}

export const createGame = (values) => async (dispatch) => {
    try {
        const {data} = await axios.post("http://localhost:3001/videogame", values)
        dispatch({type: CREATE_GAME, payload: data})  
    } catch (error) {
        console.log(error)
    }
}

export const getAllGenres = () => (dispatch) => {
    fetch("http://localhost:3001/genres")
    .then(res => res.json())
    .then(payload => dispatch({type: GET_ALL_GENRES, payload: payload}))
    .catch(e => console.log(e))
}


export const clearCache = () => {
    return {
        type: CLEAR_CACHE
    }
}

export const clearGameCache = () => {
    return {
        type: CLEAR_GAME_CACHE
    }
}

export const orderName = (payload) => {
    return {
        payload,
        type: ORDER_BY_NAME
    }
}

export const orderRating = (payload) => {
    return {
        payload,
        type: ORDER_BY_RATING
    }
} 

export const setCurrentPage = (payload) => {
    return {
        payload,
        type: SET_CURRENT_PAGE
    }
}

export const orderByLocation = (payload) => {
    return {
        payload,
        type: ORDER_BY_LOCATION
    }
}


export const orderByGenres = (payload) => {
    return {
        payload,
        type: ORDER_BY_GENRES
    }
}
