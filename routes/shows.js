const mongoose = require('mongoose');
const express = require('express');
const Show = require('../models/show');
const router = express.Router();



router.get('/:id', async (req, res) => {
    const show = await Show.findOne({id: req.params.id});
    if (!show) return res.status(404).send('Show not found. Please verify id is correct.');
    res.send(show);
});

module.exports = router;