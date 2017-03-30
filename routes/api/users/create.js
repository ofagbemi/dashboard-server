import authMiddleware from '../../../middleware/auth'
import User from '../../../models/User'


export default function route(app) {
  app.post('/', authMiddleware, validateRoot, create)
}


// contains number and letter
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])/g

function validateRoot(req, res, next) {
  req.checkBody('firstName').notEmpty()
  req.checkBody('lastName').notEmpty()
  // req.checkBody('email').isEmail()
  req.checkBody('phone')
    .optional()
    .isMobilePhone('en-US')
    .isInt()
  req.checkBody('password')
    .notEmpty()
    .isLength({ min: 6 })
    .matches(PASSWORD_REGEX)

  const errors = req.validationErrors(true)
  if (errors) {
    return next({ status: 400, errors })
  }

  return next()
}

async function create(req, res, next) {
  const { firstName, lastName, phone, password, email } = req.body
  const user = new User.model({
    name: `${firstName} ${lastName}`,
    phone,
    password,
    email,
  })

  try {
    await user.save()
  } catch (err) {
    return next(err)
  }

  return res.status(201).json(user.toJSON())
}
