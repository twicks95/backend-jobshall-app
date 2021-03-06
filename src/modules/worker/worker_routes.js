const express = require('express')
const Route = express.Router()
const workerController = require('./worker_controller')
const uploadImage = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis/redisWorker')
const authMiddleware = require('../../middleware/auth')

Route.get('/', redisMiddleware.getAllWorkerRedis, workerController.getAllWorker)
Route.get(
  '/:id',
  redisMiddleware.getWorkerByIdRedis,
  workerController.getWorkerByid
)
Route.patch(
  '/img/upload/:id',
  authMiddleware.authentication,
  authMiddleware.isWorker,
  uploadImage,
  redisMiddleware.clearDataWorkerRedis,
  workerController.updateWorkerImage
)
Route.patch(
  '/:id',
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.updateWorker
)
Route.delete(
  '/:id',
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.deleteWorker
)
Route.delete(
  '/img/delete/:id',
  authMiddleware.isWorker,
  redisMiddleware.clearDataWorkerRedis,
  workerController.deleteWorkerImage
)

module.exports = Route
