const {get} = require("./projects-model");

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

module.exports = {verifyProjectId};