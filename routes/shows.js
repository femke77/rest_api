const express = require('express');
const {Show} = require('../models/show');
const router = express.Router();

router.get('/', async (req, res) => {
    let page = req.query.page;
    let offset = parseInt(req.query.offset)
    if (isNaN(offset)) offset = 20;
    const show = await Show
        .find()
        .skip((page - 1) * offset)
        .limit(offset);
    if (!show) return res.status(404).send('Movie not found. Please verify id is correct.');
    res.send(show);
});

router.get('/:id', async (req, res) => {
    const show = await Show.findOne({id: req.params.id});
    if (!show) return res.status(404).send('Show not found. Please verify id is correct.');
    res.send(show);
});

module.exports = router;