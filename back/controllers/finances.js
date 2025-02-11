
const Finance = require('../models/Finance')

//add
function addFinance(finance){
	return Finance.create(finance)
}

//edit
async function editFinance(id, finance){
	const newFinance = await Finance.findByIdAndUpdate(id, finance, {
		returnDocument: 'after'
	})
	return newFinance
}

//delete
function deleteFinance( id ) {
	return Finance.deleteOne({_id : id})
}

//get list for client wit (filter), sort, search an pagination
async function getFinances(userId, startDate, endDate=new Date(), search = '', limit = 100000, page = 1){
	const [finances, count] = await Promise.all([
		Finance.find({owner_id: userId, date: {$gte: new Date(startDate), $lte: new Date(endDate)}, expense_item: { $regex: search, $options: 'i' }})
		.limit(limit)
        .skip((page - 1) * limit)
        .sort({date: -1 }),
		Finance.countDocuments({owner_id: userId, date: {$gte: new Date(startDate), $lte: new Date(endDate)}, expense_item: { $regex: search, $options: 'i' }})
	])

	return {
		finances,
		lastPage: Math.ceil(count / limit),
	}
}

//get item
function getFinance(id){

	const finance = Finance.findById(id)
	if(!finance){
		throw new Error ("Такая запись несуществует")
	}
	return finance
}

module.exports = {
	addFinance,
	deleteFinance,
	editFinance,
	getFinance,
	getFinances
}