const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		birthday: {
			type: Date,
		},
		email: {
			type: String,
		},
		telegram: {
			type: String,
		},
		WhatsApp: {
			type: String,
		},
		owner_id: {
			type: String,
			required: true,
		},
		projects: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project'
		}]
	},
	{ timestamps: true }
)

const Client = mongoose.model('client', ClientSchema)

module.exports = Client
