const express = require('express')
const Route = express.Router()
const {
  login,
  registerWorker,
  registerRecruiter,
  verificationWorker,
  verificationRecruiter
} = require('./auth_controller')

Route.post('/login', login)
Route.post('/register/worker', registerWorker)
Route.post('/register/recruiter', registerRecruiter)
Route.post('/patch/worker/:id', verificationWorker)
Route.post('/patch/recruiter/:id', verificationRecruiter)

module.exports = Route
