import { Router } from 'express'

import authMiddleware from '../../middleware/auth'
import users from './users'
import courses from './courses'
import auth from './auth'


module.exports = Router()
  .use('/users', users)
  .use('/courses', authMiddleware, courses)
  .use('/auth', auth)
