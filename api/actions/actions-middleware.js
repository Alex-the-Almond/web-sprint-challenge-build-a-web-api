const {get} = require('./actions-model');
const {get: projectGet} = require("../projects/projects-model");

function verifyActionId(req, res, next) {
    const {id} = req.params;
    get(id)
    .then((action) => {
        if (!action) {
            res.status(404).json({message: "No action with that id exists"});
        } else {
            next();
        }
       
    })
}


function verifyProjectId(req,res,next) {
    const {id} = req.params;
    get(id)
    .then((project) => {
        if (!project) {
            res.status(404).json({message: "No project with that id exists"})
        } else {
            next();
        }
    });
}

module.exports = {
    verifyProjectId,
     verifyActionId,
};