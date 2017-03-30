import promisify from 'promisify-node'
import jwt from 'jsonwebtoken'

import User from '../models/User'


const AUTH_TOKEN_REGEX = /^Bearer (.+)/

export default async function authMiddleware(req, res, next) {
  const auth = req.get('Authorization')
  if (!auth) {
    return next({
      status: 403,
      message: 'Authorization required',
    })
  }

  const match = auth.match(AUTH_TOKEN_REGEX)
  if (!match || !match[1]) {
    return next({
      status: 400,
      message: `Invalid Authorization header '${auth}'`,
    })
  }

  const token = match[1]
  let decoded
  try {
    decoded = await promisify(jwt.verify)(
      token,
      process.env.AUTH_TOKEN_SECRET,
      {
        maxAge: '7d',
      }
    )
  } catch (err) {
    return next({
      status: 403,
      message: `Invalid auth token '${token}'`,
    })
  }

  const { id } = decoded
  const user = await User.model.findById(id)

  Object.assign(req.data, { auth: { user } })
  return next()
}
