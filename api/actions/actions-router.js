const express = require('express');
const {get, insert, update, remove} = require('./actions-model');
const {verifyActionId} = require('./actions-middleware')
const {verifyProjectId} = require('../projects/projects-middleware');
const actionsRouter = express.Router();

actionsRouter.get('/', (req,res) => {
    get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(() => {
        res.status(500).json({message: "Failed to retrieve actions"})
    })
})

actionsRouter.get("/:id", verifyActionId, (req, res) => {
    get(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(() => {
        res.status(500).json({message: "Failed to retrieve action"})
    })
})

actionsRouter.post('/', verifyProjectId, (req, res) => {
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes) {
        res.status(400).json({message: "New action entries require project_id, description, and notes fields"})
    } else {
        insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(() => {
            res.status(500).json({message: "Failed to post new action"})
        })
    }
})

actionsRouter.put('/:id', verifyActionId, verifyProjectId, (req, res) => {
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes) {
        res.status(400).json({message: "New action entries require project_id, description, and notes fields"})
    } else {
        update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(201).json(updatedAction)
        })
        .catch(() => {
            res.status(500).json({message: "Failed to update action"})
        })
    }
})

actionsRouter.delete('/:id', verifyActionId, (req,res) => {
    remove(req.params.id)
    .then(() => {
        res.status(200).json({message: "Successfully removed action"})
    })
    .catch(() => {
        res.status(500).json({message: "Failed to retrieve action"})
    })
})

module.exports = actionsRouter