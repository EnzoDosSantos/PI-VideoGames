const axios = require("axios")
require('dotenv').config();
const {API_KEY} = process.env
const {Videogame, Genres} = require("../db.js")
async function getVideogame(id){
    try {
        if(id.includes("-")){
           let game =  await Videogame.findOne({
                where: {id: id},
                include : {
                    model: Genres,
                    attributes : ["name"]
                }
            })
            return game
        }
        let {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        let videogames = {
            id: data.id,
            name: data.name,
            description: data.description_raw,
            released: data.released,
            image: data.background_image || "https://cdn.drawception.com/drawings/fhrR1T1nq6.png",
            rating: data.rating,
            platforms: data.platforms.map(i => i.platform.name),
            genres: data.genres.length > 0 ? data.genres.map(e => e.name) : ["Not info available"]
        }
        return videogames
    } catch (error) {
        console.log(error)
    }
}

module.exports = getVideogame