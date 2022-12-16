const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const user = require('../models/user')
const payment = require('../models/payment')
const transaction = require('../models/transaction')
const DEFAULT_ADMIN = {
  email: '2d2t',
  password: '2d2t',
}

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN
  }
  return null
}

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})
const adminOptions = {
  resources: [user, payment, transaction],
}

const secret = 'very_secret_secret';
const admin = new AdminJS(adminOptions);
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookiePassword: 'very_secret_secret',
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret,
    },
  )

  module.exports = adminRouter;