const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie');

router.get('/', async (req, res) => {
    const movie = await Movie
        .find()
        .sort({year: "ascending"});
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
});


router.get('/:id', async (req, res) => {
    const movie = await Movie
        .findOne({id: req.params.id});
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
});




module.exports = router;