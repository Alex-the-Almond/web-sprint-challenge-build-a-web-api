const express = require('express');
const {get, insert, update, remove, getProjectActions} = require('./projects-model');
const {verifyProjectId} = require('./projects-middleware');
const projectsRouter = express.Router();

projectsRouter.get('/', (req,res) => {
    get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({message: "Failed to retrieve project"})
    })
})

projectsRouter.get('/:id', verifyProjectId, (req, res) => {
    get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(() => {
        res.status(500).json({message: "Failed to retrieve project"})
    })
})

projectsRouter.post('/', (req, res) => {
    const {name, description} = req.body;
    if(!name || !description) {
        res.status(400).json({message: "New project entries require name and description fields"})
    } else {
        insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(() => {
            res.status(500).json({message: "Failed to post new project"})
        })
    }
})

projectsRouter.put('/:id', verifyProjectId, (req, res) => {
    const {name, description, completed} = req.body;
    if(!name || !description || typeof completed !== 'boolean') {
        res.status(400).json({message: "{roject updates require name, description, and completed fields"})
    } else {
        update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        })
        .catch(() => {
            res.status(500).json({message: "failed to update project"})
        })
    }
})

projectsRouter.delete('/:id', verifyProjectId, (req, res) => {
   remove(req.params.id)
   .then(deletedProject => res.status(200).json(deletedProject))
   .catch(() => res.status(500).json({message: "Failed to delete targeted Project"}))
})

projectsRouter.get('/:id/actions', verifyProjectId, (req,res) => {
    getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(() => {
        res.status(500).json({message: "Testing project's root get function"})
    })
})

module.exports = projectsRouter;