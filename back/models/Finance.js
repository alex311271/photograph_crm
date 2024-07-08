const mongoose = require('mongoose')

const FinanceSchema = mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		expense_item: {
			type: String,
			required: true,
		},
		sum: {
			type: Number,
			required: true,
		},
		owner_id: {
			type: String,
			required: true
		},
	},
	{ timestamps: true }
)

const Finance = mongoose.model('finance', FinanceSchema)

module.exports = Finance
