module.exports = function(finance){
  return {
		id: finance.id,
    date: finance.date?.toISOString().substring(0, 10),
    expenseItem: finance.expense_item,
		sum: finance.sum,
		ownerId: finance.owner_id
  }
}