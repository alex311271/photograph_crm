const Client = require('../models/Client')
const Project = require('../models/Project')

//add
function addClient(client) {
	return Client.create(client)
}

//edit
async function editClient(id, client) {
	const newClient = await Client.findByIdAndUpdate(id, client, {
		returnDocument: 'after',
	})
	return newClient
}

//delete
function deleteClient(id) {
	return Client.deleteOne({ _id: id })
}

// get list for user wit (filter), sort, search an pagination
async function getClients(userId, search = '', limit = 6, page = 1) {
	const [clients, count] = await Promise.all([
		Client.find({owner_id: userId, name: { $regex: search, $options: 'i' } })
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ name: 1 }),
		Client.countDocuments({owner_id: userId, name: { $regex: search, $options: 'i' } }),
	])
	return {
		clients,
		lastPage: Math.ceil(count / limit),
	}
}


//get item
async function getClient(id) {
	const client = await Client.findById(id)
	if(client.id === ''){
		throw new Error ('Такая запись несуществует')
	}
	return client
}


module.exports = {
	addClient,
	editClient,
	deleteClient,
	getClient,
	getClients,
}
