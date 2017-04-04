const keystone = require('keystone')

module.exports = function (req, res) {
  const view = new keystone.View(req, res)
  const locals = res.locals

  // locals.section is used to set the currently selected
  // item in the header navigation.
  Object.assign(locals, { section: 'home' })

  // Render the view
  view.render('index', {
    API_URL: process.env.API_URL,
  })
}
