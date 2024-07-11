const express = require('express')
const {
	addClient,
	editClient,
	getClient,
	getClients,
	deleteClient,
	getClientProjects
} = require('../controllers/clients')
const {addProject} = require('../controllers/projects')
const mapClient = require('../helpers/mapClient')
const mapProject = require('../helpers/mapProject')
const authenticated = require('../middlewares/authenticated')


const router = express.Router({ mergeParams: true })

router.post('/', authenticated, async (req, res) => {
	const newClient = await addClient({
		name: req.body.name,
		phone: req.body.phone,
		birthday: req.body.birthday,
		email: req.body.email,
		telegram: req.body.telegram,
		WhatsApp: req.body.WhatsApp,
		owner_id: req.user.id,
	})
	res.send({ data: newClient })
})

router.get('/', authenticated, async (req, res) => {
	const { clients, lastPage } = await getClients(
		req.user.id,
		req.query.search,
		req.query.limit,
		req.query.page
	)
	res.send({ data: { lastPage, clients: clients.map(mapClient) } })
})

router.get('/:id', async (req, res) => {
	try{
	const client = await getClient(req.params.id)
	res.send({ data: mapClient(client) })
}catch (e){
	res.send({ error: e.message || 'Unknown error' })
}
})


router.patch('/:id', authenticated, async (req, res) => {
	const UpdateClient = await editClient( req.params.id, {
		name: req.body.name,
		phone: req.body.phone,
		birthday: req.body.birthday,
		email: req.body.email,
		telegram: req.body.telegram,
		WhatsApp: req.body.WhatsApp,
	})
	res.send({ data: UpdateClient })
})

router.delete('/:id', authenticated, async (req, res) => {
	await deleteClient(req.params.id)
	res.send({ error: null })
})

module.exports = router