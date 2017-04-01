const authMiddleware = require('../../../middleware/auth')
const User = require('../../../models/User')


const DEFAULT_LIMIT = 50

module.exports = function route(app) {
  app
    .get('/', authMiddleware, validateRoot, fetchUsers)
    .get('/:id', authMiddleware, validateFetchById, fetchUserById)
}

function validateRoot(req, res, next) {
  req.checkQuery('limit')
    .optional()
    .isInt({ gt: 0 })

  const errors = req.validationErrors(true)
  if (errors) {
    return next({ status: 400, errors })
  }

  req.sanitizeQuery('limit').toInt()
  return next()
}

async function fetchUsers(req, res, next) {
  const { limit } = req.query
  let users
  try {
    users = await User.model
      .find()
      .limit(limit || DEFAULT_LIMIT)
  } catch (err) {
    return next(err)
  }

  return res.json({ result: users })
}

function validateFetchById(req, res, next) {
  req.checkParams('id').isMongoId()

  const errors = req.validationErrors(true)
  if (errors) {
    return next({ status: 400, errors })
  }
  return next()
}

async function fetchUserById(req, res, next) {
  const { id } = req.params

  let user
  try {
    user = await User.model.findById(id)
  } catch (err) {
    return next(err)
  }

  if (!user) {
    return next({ status: 404, msg: `Could not find user with id ${id}` })
  }
  return res.json(user)
}
