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

// router.post('/:id/projects', authenticated, async (req, res) => {
// 	const newProject = await addProject(req.params.id,{
// 		client: req.body.client,
// 		date_shooting:req.body.dateShooting,
// 		shooting_time: req.body.shootingTime,
// 		duration_shooting: req.body.durationShooting,
// 		booking_location: req.body.bookingLocation,
// 		payment_location: req.body.paymentLocation,
// 		cost_shooting: req.body.costShooting,
// 		prepayment: req.body.prepayment,
// 		calculation: req.body.calculation,
// 		deadline: req.body.deadline,
// 		project_completed: req.body.projectCompleted,
// 		owner_id: req.user.id,
// 		client_id: req.params.clientId,
// 	})
// 	res.send({ data: mapProject(newProject) })
// });

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
	const client = await getClient(req.params.id)
	res.send({ data: mapClient(client) })
})

router.get('/:id/projects', authenticated, async (req, res) => {
	const projects = await getClientProjects(req.user.id)
	res.send({ data: { projects: projects.map(mapProject) } })
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