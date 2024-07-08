const { default: mongoose } = require("mongoose")
const mapProject = require("./mapProject")

module.exports = function (client) {
	return {
		id: client._id,
		name: client.name,
		phone: client.phone,
		birthday: client.birthday?.toISOString().substring(0, 10),
		email: client.email,
		telegram: client.telegram,
		WhatsApp: client.WhatsApp,
		ownerId: client.owner_id,
		clientId: client.client_id,
	}
}
