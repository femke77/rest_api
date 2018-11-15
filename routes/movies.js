const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie');


// returns all movies with pagination due to size of result pool

router.get('/', async (req, res) => {
    let page = parseInt(req.query.page);
    let offset = parseInt(req.query.offset)
    if (isNaN(offset)) offset = 20;
    const movie = await Movie
        .find()
        .skip((page - 1) * offset)
        .limit(offset);
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
});

//returns one movie matching id in request parameter or not found error

router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send("Invalid id type. A valid id is numeric.");
    const movie = await Movie
        .findOne({id: id});
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
});




module.exports = router;