const {Videogame, Genres} = require("../db.js")
const Sequelize = require('sequelize');
const op = Sequelize.Op;


async function getDBInfo(name){
    
    try {
        if(!name){
            const game = await Videogame.findAll({
                include: [{
                    model: Genres,
                    through:{
                        atributes: ["name"]
                    }
                }]
            })
            let data = game.map(e =>{
                return {
                name: e.name,
                id: e.id,
                released: e.released,
                rating: e.rating,
                image: e.image,
                platforms: e.platforms.map(i => i),
                genres: e.genres?.map(i => i.name),
                createdInDB: e.createdInDB
                }}
            )
            return data
        }

        const games = await Videogame.findAll({
            where: {
                name:{
                 [op.iLike]: `%${name}%`
                }
                },
            include: [{
                model: Genres,
                atributes: ["name"]
            }]
        })
        let data = games.map(e =>{
            return {
            name: e.name,
            id: e.id,
            released: e.released,
            rating: e.rating,
            image: e.image,
            platforms: e.platforms.map(i => i),
            genres: e.genres?.map(i => i.name),
            createdInDB: e.createdInDB
            }}
        )
        return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = getDBInfo