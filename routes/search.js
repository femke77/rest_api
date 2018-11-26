/*  this is my current approach to multi-resource searching. I am still doing research regarding possible violations of RESTful priciples.
    Obviously it makes no sense to have a multi-resource search in either the movies or shows routers and api/search does make sense.*
    *saipraveenblog.wordpress.com #5.   
*/

const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie')
const {Show} = require('../models/show')     

/*
    following returns a json object of all shows and/or movies matching the title (case-insensitive).
    lean converts mongo doc into js object for manipulation. It will return empty array if nothing found,
    therefore undefined objects in movie or show are not an issue. 

    REST check: Is this 'get' indempotent? yes. you can refresh this all you like and it will always return the same behavior. 
    the database gets current movie/show data, and its only by that result that we add the type to the json on a temporary basis. 
    Is this safe? yes. this will only retrieve data. 
    Can we be SURE that the movie object does not somehow grow with reloads? 'let' ensures a fresh binding. 
*/

router.get('/', async (req, res) => {  
    let movieTitle= new RegExp('^' + req.query.q + '$', 'i');
    let movie = await Movie
        .find({title: movieTitle})
        .lean(true)
        .select("-description -_id -id")
    let show = await Show
        .find({title: movieTitle})
        .lean(true)
        .select("-description -_id -id")
    if (movie.length < 1 && show.length < 1)
        return res.status(404).send("Nothing found with that title.");
    if (movie.length >= 1)   
        movie = alterDBResult(movie, "type", "movie");    
    if (show.length >= 1) 
        show = alterDBResult(show, "type", "show");      
    res.send(movie.concat(show))   
});

//alters the js object dynamically to avoid repetative details in the database. No actual changes to server occur.

function alterDBResult(object, key, value){
    object.map((o) => {
        o[key] = value
        return o;
    })
    return object;
}

module.exports = router;