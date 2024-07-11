
const Project = require('../models/Project')
const Client = require('../models/Client')

//add
async function addProject(project) {
	const newProject = await Project.create(project)
    return newProject
}

//edit
async function editProject(id, project){
    const newProject = await Project.findByIdAndUpdate(id, project, {
        returnDocument: 'after'
    })
    return newProject
}

//delete
async function deleteProject (projectId, clientId){
    await Project.deleteOne({_id:projectId})
    await Client.findByIdAndUpdate(clientId, {$pull:{projects: projectId}})

}

//get list for client wit (filter), sort, search an pagination
async function getProjects(userId, search = '', limit = 10000, page = 1){
    const[projects, count] = await Promise.all([
        Project.find({owner_id: userId, client: { $regex: search, $options: 'i' } })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({date_shooting: -1 , shooting_time: 1}),
    Project.countDocuments({owner_id: userId, client: { $regex: search, $options: 'i' } }),
    ])
    return {
        projects,
        lastPage: Math.ceil(count/limit)
    }
}




//get item for project
function getProject(id){
    const project = Project.findById(id)
    if(!project){
        throw new Error ("Такая запись несуществует")
    }
    return project
}

module.exports = {
addProject,
deleteProject,
editProject,
getProject,
getProjects,
}