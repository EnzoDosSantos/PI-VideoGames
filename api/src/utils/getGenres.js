const axios = require("axios")
require('dotenv').config();
const {API_KEY} = process.env
const {Genres} = require("../db.js")

async function getGenres(){

    try {
        const allGenre = await Genres.findAll()
        if(allGenre.length === 0){
            let { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

            data.results.forEach(e => {
                 Genres.findOrCreate({
                    where: {
                        id: e.id,
                        name: e.name
                    }
                })
            });
            const allGenre = await Genres.findAll()
            return allGenre
        }
        return allGenre
    } catch (error) {
        console.log(error)
    }

}

module.exports = getGenres