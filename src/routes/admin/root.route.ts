import * as _ from 'lodash'
import * as Boom from 'boom'
import * as jwt from 'jsonwebtoken'
//
import config from '../../configs/config'
import { messageCode } from '../../constants/const'
class RootRoute {
  protected responseHandler(res, error, result): void {
    if (!_.isEmpty(result) && result.isBoom)
      return res.send({
        success: 0,
        result
      })

    if (result)
      return res.send({
        total: result.length,
        success: 1,
        result: result
      })

    return res.send({
      success: 0,
      error
    })
  }

  public authenHandler(req, res, next) {
    const url = req.originalUrl
    let token, authenString

    // Do not authen with login, register and hub login API
    if (_.indexOf(['/user/login'], url) !== -1) {
      next()
    } else {
      authenString = _.split(req.headers.authorization, ' ')
      // get token from header
      if (!_.isEmpty(authenString) && authenString[0] === 'x-access-token') {
        token = authenString[1]
        jwt.verify(token, config.jwt.secretKey, function(err, decode) {
          if (err) {
            res.status(401).send({
              success: 0,
              result: {
                message: 'Failure authen token'
              }
            })
          } else {
            req.decode = decode
            next()
          }
        })
      } else {
        res.status(401).send({
          success: 0,
          result: {
            message: 'Failure authen token'
          }
        })
      }
    }
  }

  public checkAdminPermission(req, res, next) {
    if (_.parseInt(req.decode.role) !== 1)
      return res.send(Boom.forbidden('You have not permission to call request'))

    next()
  }
}

export default RootRoute
