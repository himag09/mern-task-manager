const { Router } = require('express');
const express = require('express');
const task = require('../models/task');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
})


router.post('/', async (req, res) => {
    const {title, description } = req.body;
    const task = new Task({title, description});
    await task.save();
    
    res.json({status: 'Task saved'});
})

router.put('/:id', async (req, res)=>{
    const {title, description} = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask, { useFindAndModify: false });

    res.json({status: 'task updated'});
} )

router.delete('/:id', async (req, res) =>{
    await Task.findByIdAndDelete(req.params.id);

    res.json({status: 'task deleted '});
})



module.exports = router;