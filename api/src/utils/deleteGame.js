const { Videogame } = require("../db.js")

const deleteGame = async (id) => {
    try {
        await Videogame.destroy({
            where: {id: id}
        })
    } catch (error) {
      console.log(error)   
    }
}

module.exports = deleteGame