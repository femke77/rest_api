//dev note: two or more awaits in a single method with sync code following are supported as of ES7, the .then is not explicitly required
//ensure the latest version of nodejs if you work on this API

//also: there are repeated shows in the db which I did not realize, and finally found with mongoshell, after thinking I had a bug
//in this code. If you are reading this I did not have time to clean up the database. 

 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie')
const {Show} = require('../models/show')
 

router.get('/', async (req, res) => {
    const title = req.query.title;  
    const movie = await Movie
        .find({title: new RegExp('^' + title + '$', 'i')})
        .lean(true)
        .select("-description -_id -id")
        .limit(20);
    const show = await Show
        .find({title: new RegExp('^' + title + '$', 'i')})
        .lean(true)
        .select("-description -_id -id")
        .limit(20);
    let resultA =[], resultB = [];
    if ((movie === undefined || movie.length < 1) && (show === undefined || show.length < 1))
        return res.status(404).send("nothing found with that title");
    if (movie !== undefined && movie.length >=1)  {  
        resultA= movie.map( (o) => {
        o.type = "movie";
        return  o;
    })};
    if (show !== undefined && show.length >=1) {
        resultB = show.map( (o) => {
        o.type = "show"
        return o;
    })};   
    let result = resultA.concat(resultB)
    res.send(result)   
});



module.exports = router;