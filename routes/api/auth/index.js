const jwt = require('jsonwebtoken')
const { Router } = require('express')

const { DAY_SECONDS } = require('../../../util')
const User = require('../../../models/User')


const router = Router()

router.post('/', validateRoot, auth)

function validateRoot(req, res, next) {
  req.checkBody('email').isEmail()

  const errors = req.validationErrors(true)
  if (errors) {
    return next({ status: 400, errors })
  }
  return next()
}

async function auth(req, res, next) {
  const { email, password } = req.body

  let user
  try {
    user = await User.model.findOne({ email })
  } catch (err) {
    return next(err)
  }

  if (!user) {
    return next({
      status: 404,
      msg: `Could not find user with email '${email}'`,
    })
  }
  return user._.password.compare(password, (err, valid) => {
    if (valid) return res.json({ token: generateAuthToken(user) })
    return next({
      status: 403,
      msg: `Invalid password for user with email '${email}'`,
    })
  })
}

function generateAuthToken(user) {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.AUTH_TOKEN_SECRET,
    {
      expiresIn: DAY_SECONDS,
    }
  )
}

module.exports = router
