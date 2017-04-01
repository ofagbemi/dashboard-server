const { Router } = require('express')

const authMiddleware = require('../../middleware/auth')
const users = require('./users')
const courses = require('./courses')
const auth = require('./auth')


module.exports = Router()
  .use('/users', users)
  .use('/courses', authMiddleware, courses)
  .use('/auth', auth)
