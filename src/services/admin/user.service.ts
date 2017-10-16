// Libs
import * as async from 'async'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Model
import { UserModel } from '../../models'
import { IUser } from '../../constants/interfaces'
//
//
class UserServices {
  /**
     * @param {any} params 
     * @param {any} callback 
     * @memberof UserServices
     */
  public loginService(params, callback) {
    const { username, password } = params
    let user
    async.waterfall(
      [
        // Check user is exist
        done => {
          UserModel.getUserByUsername(
            {
              username
            },
            (err, result) => {
              done(err, result)
            }
          )
        }
      ],
      (err, user: any) => {
        if (!user) return callback(null, Boom.notFound('User not found'))

        if (!user.validatePassword(password)) {
          return callback(null, Boom.unauthorized('invalid  password'))
        }

        user = user.removePrivacyInfo(user)
        callback(null, {
          user,
          token: user.generationToken(user.toJSON())
        })
      }
    )
  }

  /**
     * Service get register new user
     * @param params:  {}
     * @param callback
     */
  public async registerService(params, callback): Promise<any> {
    await UserModel.createUser(params, (err, result) => {
      if (_.size(result) === 0) {
        return callback('User is exist')
      }
      callback(err, result)
    })
  }

  getUserInfo(params, callback) {
    const { userID } = params

    async.waterfall(
      [
        // Check user is exist
        done => {
          UserModel.getUserByID(
            {
              userID
            },
            (err, result) => {
              if (err) {
                return done('EM0001')
              }
              if (_.isEmpty(result)) {
                return done('EM0004')
              }
              done(null, result)
            }
          )
        }
      ],
      callback
    )
  }

  public getAllUser(params, callback) {
    UserModel.getAllUser(params, callback)
  }

  public getUserByID(req, callback) {
    UserModel.getUserByID(req.params, callback)
  }

  public updateInfo(req, callback) {
    UserModel.updateInfo(req.body, callback)
  }

  public deleteUser(req, callback) {
    const { id } = req.body
    UserModel.removeUser({ id }, callback)
  }
}

export default new UserServices()
