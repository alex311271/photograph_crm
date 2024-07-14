const express =require('express')
const {addProject, deleteProject, editProject, getProject, getProjects} = require ('../controllers/projects')
const authenticated = require('../middlewares/authenticated')
const mapProject = require('../helpers/mapProject')

const router = express.Router({ mergeParams: true })

router.post('/', authenticated, async (req, res) => {
	const newProject = await addProject({
		client: req.body.client,
		date_shooting:req.body.dateShooting,
		shooting_time: req.body.shootingTime,
		duration_shooting: req.body.durationShooting,
		booking_location: req.body.bookingLocation,
		payment_location: req.body.paymentLocation,
		cost_shooting: req.body.costShooting,
		prepayment: req.body.prepayment,
		calculation: req.body.calculation,
		deadline: req.body.date,
		project_completed: req.body.projectCompleted,
		owner_id: req.user.id,
		client_id: req.body.clientId,
	})
	res.send({ data: mapProject(newProject) })
});

router.get('/', authenticated, async (req, res) => {
	const { projects, lastPage } = await getProjects(
		req.user.id,
		req.query.search,
		req.query.limit,
		req.query.page
	)
	res.send({ data: { lastPage, projects: projects.map(mapProject) } })
})


router.get('/:id', authenticated, async (req, res) => {
	try{
		const project = await getProject(req.params.id)
		res.send({ data:  mapProject(project) })
	}catch(e){
		res.send({ error: e.message || 'Unknown error' })
	}
})

router.patch('/:id', authenticated, async (req, res) => {
	const UpdateProject = await editProject(req.params.id, {
		client: req.body.client,
		date_shooting:req.body.dateShooting,
		shooting_time: req.body.shootingTime,
		duration_shooting: req.body.durationShooting,
		booking_location: req.body.bookingLocation,
		payment_location: req.body.paymentLocation,
		cost_shooting: req.body.costShooting,
		prepayment: req.body.prepayment,
		calculation: req.body.calculation,
		deadline: req.body.date,
		project_completed: req.body.projectCompleted,
	})
	res.send({ data: mapProject(UpdateProject) })
})

router.delete('/:id', authenticated, async (req, res) => {
	await deleteProject(req.params.id)
	res.send({ error: null })
})

module.exports = router