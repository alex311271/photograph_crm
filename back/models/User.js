const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('user', UserSchema)

module.exports = User
