const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const validator = require('../middleware/validate');

// returns all movies with pagination due to size of result pool. Offset is adjustable but only to 100/page

router.get('/', async (req, res) => {
    let page = parseInt(req.query.page);
    let offset = parseInt(req.query.offset);
    let sort = req.query.sort;   
    if (isNaN(offset) || offset > 100) offset = 20;
    const movie = await Movie
        .find()
        .skip((page - 1) * offset)
        .limit(offset)
        .sort(sort)
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

//adds a new movie

router.post('/', validator(validate), async(req,res) => {
    const movie = new Movie({
        id: req.body.id,
        title: req.body.title,
        year: req.body.year,
        description: req.body.description
    });
    await movie.save();
    res.send(movie);
});

//deletes a movie by id

router.delete('/:id',  async(req, res) => {
    let movie_id = parseInt(req.params.id);
    if (isNaN(movie_id)) return res.status(400).send("Invalid id type. A valid id is numeric.");
    const movie = await Movie.findOneAndRemove({id: movie_id});
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
    
});



module.exports = router;