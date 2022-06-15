import { 
    SET_CURRENT_PAGE,
    GET_ALL_GAMES,
    GET_ONE_GAME,
    GET_ALL_GENRES,
    GET_GAMES_BY_NAME,
    CREATE_GAME,
    CLEAR_CACHE,
    CLEAR_GAME_CACHE,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    ORDER_BY_LOCATION,
    ORDER_BY_GENRES
    } from "../actions";

const initialState = {
    games: [],
    allGames: [],
    game: [],
    genres: [],
    platforms: [],
    search: false,
    page: 1
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES:
            let platforms = [];
            action.payload.map(e => platforms = [...platforms, ...e.platforms]);
            return {
            ...state,
            search: false,
            games: action.payload,
            allGames: action.payload,
            platforms: Array.from(new Set(platforms)),
            page: 1
        }

        case GET_ONE_GAME:
            return {
                ...state,
                game:  action.payload,
                page: 1
        }

        case GET_GAMES_BY_NAME:
            let error = {error: "No results found"}
            if(action.payload.msg){
                return {
                    ...state,
                    search: true,
                    allGames: error,
                    page: 1
                }
            }
            return {
                ...state,
                search: true,
                allGames: action.payload,
                games: action.payload,
                page: 1
        }

        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
        }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                page: action.payload
            }

        case CLEAR_CACHE:
            return {
                ...state,
                games: [],
                allGames: []
            }
        
        case CLEAR_GAME_CACHE:
            return {
                ...state,
                game: []
            }

        case CREATE_GAME:
            return {
                ...state,
                games: [...state.games, action.payload],
                allGames: [...state.games, action.payload]
            }
        
        case ORDER_BY_NAME:
            if(action.payload === "Default order"){
                return{
                    ...state,
                    games: state.games,
                    page: 1
                }
            }
            const order = action.payload === 'A-Z' ?
            state.games.sort((a , b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
                return 0
            })
             :
            state.games.sort((a , b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return - 1
                if(b.name.toLowerCase() > a.name.toLowerCase()) return 1
                return 0
            })
            return {
                ...state,
                games: order,
                page: 1
        }
        
        case ORDER_BY_RATING:
            if(action.payload === "Default order"){
                return {
                    ...state,
                    games: state.allGames,
                    page: 1
                }
            } 
            const order2 = action.payload === "Higher - lower"?
            state.games.sort((a,b) => Number(b.rating) - Number(a.rating))
            : 
            state.games.sort((a,b) => Number(a.rating) - Number(b.rating))
        return {
            ...state,
            games: order2,
            page: 1
        }

        case ORDER_BY_LOCATION:
            if(action.payload === "All games"){
                return {
                    ...state,
                    games: state.allGames,
                    page: 1
                }
            }
            let order3 = action.payload === "Created at db" ?
            state.games.filter(e => e.createdInDB)
            :
            state.allGames.filter(e => !e.createdInDB)
            let error2 = {error: "No results found"}
            if(order3.length === 0){
                return {
                    ...state,
                    allGames: error2,
                    page: 1
                }
            }
            return {
            ...state,
            games: order3,
            page: 1
        }

        case ORDER_BY_GENRES:
            if(action.payload === "Default order"){
                return {
                    ...state,
                    games: state.allGames,
                    page: 1
                }
            }
            let order4 = state.games.filter(e => e.genres.includes(action.payload))
            let error3 = {error: "No results found"}
            if(order4.length === 0){
                return {
                    ...state,
                    allGames: error3,
                    page: 1
                }
            }
            return {
                ...state,
                games: order4,
                page: 1
            }
        default: return state
    }
}

export default rootReducer