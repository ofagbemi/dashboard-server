import User from '../../../models/User'


const DEFAULT_LIMIT = 50

export default function route(app) {
  app
    .get('/', validateRoot, fetchUsers)
    .get('/:id', validateFetchById, fetchUserById)
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
    users = await User.model.find()
      .limit(limit || DEFAULT_LIMIT)
      .exec()
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
    user = await User.model.findById(id).exec()
  } catch (err) {
    return next(err)
  }

  if (!user) {
    return next({ status: 404, msg: `Could not find user with id ${id}` })
  }
  return res.json(user)
}