const getApiInfo = require("../utils/getApiInfo.js")
const getGenres = require("../utils/getGenres.js")
const getVideogame = require("../utils/getVideogame.js")
const createGame = require("../utils/createGame.js")
const getDBInfo = require("../utils/getDBInfo.js")
const deleteGame = require("../utils/deleteGame.js")


module.exports = {

    videogames: async function(req, res, next){
        try {
            const {search} = req.query
            if(!search){
                let data = await getApiInfo()
                let myData = await getDBInfo()
                if(!myData || myData.length === 0){
                    if(!data || data.length === 0){
                        return res.status(404).json({msg: "Oops, this game does not exist"})
                    }
                    return res.json(data)
                }
                let totalData = data.concat(myData)
                return res.json(totalData)
            }

            let data = await getApiInfo(search)
            let myData = await getDBInfo(search)
            if(!myData || myData.length === 0){
                if(!data || data.length === 0){
                   return res.status(404).json({msg: "Oops, this game does not exist"})
                }
                return res.json(data)
            }
            let totalData = [...myData, ...data]
            let totalDataSlice = totalData.slice(0, 15)
                return res.json(totalDataSlice)
        } catch (error) {
            return next(error)
        }
    },


    
    genres: async function(req, res, next){
        try {
            let genres = await getGenres()
            genres = genres.sort((a,b) => a.id - b.id)
            return res.json(genres)
        } catch (error) {
            return next(error)
        }
    },



    idVideogame: async function(req, res, next){
        try {
            const {id} = req.params
            let game = await getVideogame(id)
            if(!game){
                return res.status(404).json({msg: "Oops, this game does not exist"})
            }
            return res.json(game)
        } catch (error) {
            return next(error)
        }
    },



    createGame: async function(req, res, next){
        try {
            let {name, description, released, rating, platforms, genres, image} = req.body
            if(!name || !description || !platforms){
                return res.status(404).json({msg: "Missing to send data"})
            }
            let game = await createGame(name, description, released, rating, platforms, genres, image)
            return res.json(game)
        } catch (error) {
            return next(error)
        }
    },


    deleteGame: async function(req, res, next){
        try {
            const {id} = req.params
            if(!id){
                return res.status(404).json({msg: "NO ID"})
            }
            await deleteGame(id)
            return res.json({msg: "Eliminado"})
        } catch (error) {
            return next(error)
        }
    }
}
