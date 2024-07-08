const express = require('express')
const {addFinance, editFinance, deleteFinance, getFinance, getFinances} = require('../controllers/finances')
const mapFinance = require('../helpers/mapFinance')
const authenticated = require('../middlewares/authenticated')

const router = express.Router({ mergeParams: true })

router.post('/', authenticated, async (req, res) => {
	const newFinance = await addFinance({
		date: req.body.date,
		expense_item: req.body.expenseItem,
		sum: req.body.sum,
		owner_id: req.user.id
	})
	res.send({data: newFinance})
})

router.get('/', authenticated, async(req, res) => {
	const { finances, lastPage } = await getFinances(
		req.user.id,
		req.query.search,
		req.query.limit,
		req.query.page
	)
	res.send({ data: { lastPage, finances: finances.map(mapFinance) } })
})

router.get('/:id', authenticated, async (req, res) => {
	const finance = await getFinance(req.params.id)
	res.send({data: mapFinance(finance)})
})

router.patch('/:id', authenticated, async (req, res) => {
	const UpdateFinance = await editFinance(req.params.id, {
		date: req.body.date,
		expense_item: req.body.expenseItem,
		sum: req.body.sum,
	})
	res.send({data: mapFinance(UpdateFinance)})
})

router.delete('/:id', authenticated, async (req, res) =>{
	await deleteFinance(req.params.id)
	res.send({error: null})
})

module.exports = router