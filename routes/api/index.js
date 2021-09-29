const router = require('express').Router()
const thoughtRoutes = require('./thought-routes')
const userRoutes = require('./user-routes')

router.use('/thoughts')
router.use('/users')
router.use('/reaction')
router.use('/friends')

module.exports = router