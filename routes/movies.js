const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie');

// returns all movies with pagination due to size

router.get('/', async (req, res) => {
    let page = req.query.page;
    let offset = parseInt(req.query.offset)
    if (isNaN(offset)) offset = 10;
    const movie = await Movie
        .find()
        .skip((page - 1) * offset)
        .limit(offset)
        .sort({year: -1});
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
});

//returns one movie matching id in request parameter or not found error

router.get('/:id', async (req, res) => {
    const movie = await Movie
        .findOne({id: req.params.id});
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
});




module.exports = router;