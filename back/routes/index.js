const express = require('express')

const router = express.Router({mergeParams: true})

router.use('/', require('./auth') )
router.use('/clients', require('./clients'))
router.use('/finances', require ('./finances'))
router.use('/projects', require('./projects'))

module.exports = router