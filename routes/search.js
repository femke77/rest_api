//ES7 and latest version of nodejs support two awaits with syncronous code to follow. The .then is not explicitly required.
 
const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie')
const {Show} = require('../models/show')     

//returns a json object of all shows and/or movies matching the title (case-insensitive)
//lean converts mongo doc into js object for manipulation. It will return empty array if nothing found.

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
        movie = alterDBResult(movie, "movie");    
    if (show.length >= 1) 
        show = alterDBResult(show, "show");      
    res.send(movie.concat(show))   
});

//alters the js object dynamically to avoid repetative details in the database

function alterDBResult(object, value){
    object.map((o) => {
        o.type = value
        return o;
    })
    return object;
}

module.exports = router;