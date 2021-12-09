const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genreGameRouter = require('./genregame.js')
const videoGameRouter = require('./videogame.js') //creo la const de videogame//



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genregame', genreGameRouter);
router.use('/videogame', videoGameRouter); //creo la ruta de videogame//
//router.use('/videogame', videoGameRouter); //rutas 
module.exports = router;
