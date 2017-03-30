import { Router } from 'express'

import users from './users'
import courses from './courses'


module.exports = Router()
  .use('/users', users)
  .use('/courses', courses)
