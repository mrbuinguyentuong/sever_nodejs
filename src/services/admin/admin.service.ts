// Libs
import * as async from 'async'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Model
import { UserModel } from '../../models'
import { IUser } from '../../constants/interfaces'
//
//
class AdminService {
  public addNewUser(params, callback) {
    const role = params.role || 2,
      status = params.status || false

    UserModel.createUser(
      {
        ...params,
        role,
        status,
        avatar: '/images/default-avatar.png'
      },
      (err, result) => {
        if (_.size(result) === 0) return callback('User is exist')
        callback(err, result)
      }
    )
  }

  public deleteUser(params, callback) {
    const { id } = params

    UserModel.removeUser({ id }, callback)
  }

  public getAllUser({}, callback) {
    UserModel.getAllUser({}, callback)
  }

  public updateUserInfo(params, callback) {
    const { id } = params

    UserModel.updateInfo({ params, id }, callback)
  }
}

export default new AdminService()
