/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone')
const middleware = require('./middleware')
const validator = require('express-validator')

const importRoutes = keystone.importer(__dirname)

// Common Middleware
keystone.pre('routes', validator())
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)


// Import Route Controllers
const routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api'),
}

// Setup Route Bindings
module.exports = (app) => {
  app.use((req, res, next) => {
    Object.assign(req, { data: {} })
    return next()
  })

  // Views
  app.get('/', routes.views.index)
  app.use('/api', routes.api.index)

  app.use((err, req, res, next) => {
    return res
      .status(err.status || 500)
      .json(err)
  })

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);
}
