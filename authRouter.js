const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post(
  '/registration',
  [
    check('username', 'User name can"t be empty').notEmpty(),
    check(
      'username',
      'User name should consist at least from 3 characters'
    ).isLength({ min: 3 }),
    check(
      'password',
      'Min length of password must by 4 symbols and max 10'
    ).isLength({ min: 4, max: 10 })
  ],
  controller.registration
)
router.post('/login', controller.login)
router.get(
  '/users',
  roleMiddleware(['ADMIN']),
  authMiddleware,
  controller.getUsers
)

module.exports = router
