module.exports = function (project) {
	return {
		id: project.id,
		client: project.client,
    dateShooting:project.date_shooting.toISOString().substring(0, 10),
    shootingTime: project.shooting_time,
    durationShooting: project.duration_shooting,
    costShooting: project.cost_shooting,
    bookingLocation: project.booking_location,
    paymentLocation: project.payment_location,
    prepayment: project.prepayment,
    calculation: project.calculation,
    date: project.deadline?.toISOString().substring(0, 10),
    projectCompleted: project.project_completed?.toISOString().substring(0, 10),
    ownerId: project.owner_id,
    clientId: project.client_id
	}
}
