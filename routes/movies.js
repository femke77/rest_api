const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const validator = require('../middleware/validate');

// returns all movies with pagination due to size of result pool. limit is adjustable but only to 100/page

router.get('/', async (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let sort = req.query.sort;   
    if (isNaN(limit) || limit > 100) limit = 20;
    const movie = await Movie
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
});

//returns one movie matching id in request parameter or not found error

router.get('/:id', async (req, res) => {
    let movieId = parseInt(req.params.id);
    if (isNaN(movieId)) return res.status(400).send("Invalid id type. A valid id is numeric.");
    const movie = await Movie
       .findOne({id: movieId});
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

//updates a document by id

router.put('/:id', validator(validate), async (req, res) => {
    let movieId = parseInt(req.params.id);
    if (isNaN(movieId)) return res.status(400).send("Invalid id type. A valid id is numeric.");
    const movie = await Movie.findOneAndUpdate({id: movieId}, 
        {        
            title: req.body.title,
            year: req.body.year,
            description: req.body.description           
        }, {new: true, runValidators: true});
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
});


//deletes a movie by id

router.delete('/:id',  async(req, res) => {
    let movieId = parseInt(req.params.id);
    if (isNaN(movieId)) return res.status(400).send("Invalid id type. A valid id is numeric.");
    const movie = await Movie.findOneAndRemove({id: movieId});
    if (!movie) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(movie);
    
});



module.exports = router;