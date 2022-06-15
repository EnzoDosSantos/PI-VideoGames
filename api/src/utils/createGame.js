const {Videogame, Genres} = require("../db.js")


async function createGame(name, description, released, rating, platforms, genres, image = "https://e7.pngegg.com/pngimages/205/240/png-clipart-question-mark-illustration-new-super-mario-bros-2-new-super-mario-bros-2-super-mario-bros-angle-super-mario-bros.png"){
    try {
        const game = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            genres,
            image
        })

        const searchGenres = await Genres.findAll({
            where: {
                id: genres
            }
        })

        game.addGenres(searchGenres)
        return game
    } catch (error) {
        console.log(error)
    }
}

module.exports = createGame