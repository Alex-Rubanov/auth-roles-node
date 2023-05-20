const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

class authController {
  async registration (req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error ', errors })
      }

      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        res.status(400).json({ meassage: 'User with this name already exits' })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: 'USER' })
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value]
      })
      await user.save()
      return res.json({ message: 'User was successfully registered!' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async login (req, res) {
    try {
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Login error' })
    }
  }

  async getUsers (req, res) {
    try {
      res.json('server works')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new authController()
