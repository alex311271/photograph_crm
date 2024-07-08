const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema(
	{
		client: {
			type: String,
			required: true,
		},
		date_shooting: {
			type: Date,
			required: true,
		},
		shooting_time: {
			type: String,
		},
		duration_shooting: {
			type: String,
		},
		cost_shooting: {
			type: Number,
		},
		booking_location: {
			type: String,
		},
		payment_location: {
			type: Number,
		},
		prepayment: {
			type: Number,
		},
		calculation: {
			type: Number,
		},
		deadline: {
			type: Date,
			required: true,
			
		},
		project_completed: {
			type: Date,
		},
		owner_id: {
			type: String,
			required: true,
		},
		client_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project
