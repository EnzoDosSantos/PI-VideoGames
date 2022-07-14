const axios = require("axios")
require('dotenv').config();
const {API_KEY} = process.env

async function getApiInfo(name){
    try {
        let URL = `https://api.rawg.io/api/games?key=df9377a8ee214a3db98bfcee245b4f48`
        if(!name){
            let apiData = []
            let next_url = URL
            for(let i = 0; i < 5; i++){
                let pages = await axios.get(next_url)
                pages.data.results.map(e => {
                    apiData.push(
                        {
                            name: e.name,
                            id: e.id,
                            released: e.released,
                            rating: e.rating,
                            image: e.background_image,
                            platforms: e.platforms.map(i => i.platform.name),
                            genres: e.genres.map(i => i.name)
                        }
                    )
                    next_url = pages.data.next
                })
            }
            return apiData
        }
        
        let {data} = await axios.get(`https://api.rawg.io/api/games?key=df9377a8ee214a3db98bfcee245b4f48&search=${name}`)
        let apiData = []
        data.results.map(e => {
            apiData.push(
                {
                    name: e.name,
                    id: e.id,
                    released: e.released,
                    rating: e.rating,
                    image: e.background_image || "https://cdn.drawception.com/drawings/fhrR1T1nq6.png",
                    platforms: e.platforms.map(i => i.platform.name),
                    genres: e.genres.length > 0 ? e.genres.map(i => i.name) : ["Not info available"],
                }
            )
        })
        if(apiData.length > 15){
            return apiData.slice(0, 15)
        }
        return apiData
    } catch (error) {
         console.log(error)
    }

}

module.exports = getApiInfo