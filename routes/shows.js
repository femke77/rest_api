//TODO able to post >1 show with same id. Need to change that and make it auto-increment so user doesn't deal with id
//TODO "show not found" appearing repeatedly. Refactor. 

const express = require('express');
const {Show, validate} = require('../models/show');
const router = express.Router();
const validator = require('../middleware/validate');

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
    if (!show) return res.status(404).send('Show not found. Please verify id is correct.');
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

router.post('/', validator(validate), async (req,res) => {
    const show = new Show({
        id: req.body.id,
        title: req.body.title,
        year: req.body.year,
        description: req.body.description
    });
    await show.save();
    res.send(show);
});

//updates a document by id

router.put('/:id', validator(validate), async (req, res) => {
    let showId = parseInt(req.params.id);
    if (isNaN(showId)) return res.status(400).send("Invalid id type. A valid id is numeric.");
    const show = await Show.findOneAndUpdate({id: showId}, 
        {        
            title: req.body.title,
            year: req.body.year,
            description: req.body.description           
        }, {new: true, runValidators: true});
    if (!show) return res.status(404).send('Show not found. Please verify id is correct.');
    res.send(show);
});

router.delete('/:id',  async(req, res) => {
    let showId= parseInt(req.params.id);
    if (isNaN(showId)) return res.status(400).send("Invalid id type. A valid id is numeric.");
    const show = await Show.findOneAndRemove({id: showId});
    if (!show) return res.status(404).send('Show not found. Please verify id is correct.');
    res.send(show);
    
});


module.exports = router;

   