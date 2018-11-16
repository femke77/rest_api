const express = require('express');
const {Show, validate} = require('../models/show');
const router = express.Router();

router.get('/', async (req, res) => {
    let page = parseInt(req.query.page);
    let offset = parseInt(req.query.offset)
    let sort = req.query.sort;
    if (isNaN(offset)) offset = 20;
    const show = await Show
        .find()
        .skip((page - 1) * offset)
        .limit(offset)
        .sort(sort);
    if (!show) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(show);
});

router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send("Invalid id type. A valid id is numeric."); 
    const show = await Show
        .findOne({id: id});
    if (!show) return res.status(404).send('Show not found. Please verify id is correct.');
    res.send(show);
});


router.post('/', async(req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const show = new Show({
        id: req.body.id,
        title: req.body.title,
        year: req.body.year,
        description: req.body.description
    });
    await show.save();
    res.send(show);
});


module.exports = router;

   