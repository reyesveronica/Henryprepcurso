const { Router } = require('express');
const router = Router();
const {GenreGame} = require('../db')


router.get('/', async (req, res, next) => {
    try {
        const genero = await GenreGame.findAll()
        
        res.send(genero)
    } catch(error) {
        next(error)
    }
})
// precargar generos de api en db
/*
router.post('/', (req, res, next) => {
    const {name} = req.body
    return GenreGame.create({name})
    .then((newGenregame) => {
        res.status(201).send(newGenregame)
    })
    .catch(error => next(error))
})
*/





router.put('/', (req, res, next) => {
    res.send('soy put /genregame')
});


router.delete('/', (req, res, next) => {
    res.send('soy delete /genregame')
});


module.exports = router;