const { Router } = require('express')

const fetch = require('./fetch')
const create = require('./create')


const router = Router()

fetch(router)
create(router)

module.exports = router
