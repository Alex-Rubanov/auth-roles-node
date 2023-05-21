const jwt = require('jsonwebtoken')

const roleMiddleware = roles => {
  return (req, res, next) => {
    if (req.mehtod === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(403).json({ message: 'Unauthorized user' })
      }

      const { roles: userRoles } = jwt.verify(token, process.env.SECRET_KEY)
      let hasRole = false
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })

      if (!hasRole) {
        return res
          .status(403)
          .json({
            message:
              'user does not have the necessary permissions to access the requested resource'
          })
      }

      next()
    } catch (error) {
      console.log(error)
      return res.status(403).json({ message: 'Unauthorized user' })
    }
  }
}

module.exports = roleMiddleware
