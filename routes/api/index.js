const router = require('express').Router()
const thoughtRoutes = require('./thought-routes')
const userRoutes = require('./user-routes')

router.use('/users', userRoutes)
router.use('/friends', thoughtRoutes)

module.exports = router