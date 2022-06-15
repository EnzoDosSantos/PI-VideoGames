const { Router } = require('express');
const {videogames, genres, idVideogame, createGame} = require("../controllers/controllers.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", videogames)
router.get("/genres", genres)
router.get("/videogame/:id", idVideogame)
router.post("/videogame", createGame)


module.exports = router;