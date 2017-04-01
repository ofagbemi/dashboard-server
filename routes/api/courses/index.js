const { Router } = require('express')

const fetch = require('./fetch')

const router = Router()

module.exports = router

fetch(router)
