import Course from '../../../models/Course'


const DEFAULT_LIMIT = 20

module.exports = (app) => {
  app
    .get('/', validateRoot, fetch)
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

async function fetch(req, res, next) {
  const { limit } = req.query
  let courses
  try {
    courses = await Course.model.find()
      .limit(limit || DEFAULT_LIMIT)
      .exec()
  } catch (err) {
    return next(err)
  }

  return res.json({ result: courses })
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

  let course
  try {
    course = await Course.model.findById(id).exec()
  } catch (err) {
    return next(err)
  }

  if (!course) {
    return next({ status: 404, msg: `Could not find course with id ${id}` })
  }
  return res.json(course)
}
