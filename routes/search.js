
const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie')
const {Show} = require('../models/show')     

//returns a json object of all shows and/or movies matching the title (case-insensitive).
//lean converts mongo doc into js object for manipulation. It will return empty array if nothing found,
//therefore undefined objects are not an issue

router.get('/', async (req, res) => {
    let title = req.query.title;  
    let regex = new RegExp('^' + title + '$', 'i');
    let movie = await Movie
        .find({title: regex})
        .lean(true)
        .select("-description -_id -id")
    let show = await Show
        .find({title: regex})
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

//alters the js object dynamically to avoid repetative details in the database. 
//tells user if result is movie or show

function alterDBResult(object, key, value){
    object.map((o) => {
        o[key] = value
        return o;
    })
    return object;
}

module.exports = router;