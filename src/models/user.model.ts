import * as _ from 'lodash'
import * as Mongoose from 'mongoose'
//
import BaseModel from './base.model'
import { IUser } from '../constants/interfaces'
import { UserSchema } from '../schemas'
//
import { Utils } from '../libs'
//
class UserModel extends BaseModel {
  protected Model
  constructor() {
    super()
    this.Model = Mongoose.model<IUser>('User', UserSchema)
  }

  public createUser(params, callback): any {
    this.Model.create(params, (err, result: IUser) => {
      let user: any = this.parse(result)
      delete user.password
      callback(err, user)
    })
  }

  getUserByID(params, callback) {
    const { id } = params

    this.get(
      {
        queryCondition: {
          _id: id
        }
      },
      (err, user) => {
        if (err) callback('EM0001')
        else callback(null, this.parse(user)[0])
      }
    )
  }

  /**
     * 
     * Function get user by username
     * @param {any} params 
     * @param {any} callback 
     * @memberof UserModel
     */
  public getUserByUsername(params, callback) {
    const { username } = params

    this.get(
      {
        queryCondition: {
          username
        },
        limit: 1
      },
      (err, result) => {
        callback(err, result[0])
      }
    )
  }

  public removeUser(params, callback) {
    const { id } = params

    this.update(
      {
        queryCondition: {
          _id: id
        },
        updateData: {
          isRemove: true
        }
      },
      callback
    )
  }

  public getAllUser(params: {}, callback): void {
    this.get(
      {
        query: params,
        limit: null,
        isRemove: false
      },
      (err, result) => {
        if (!err) return callback(null, result)

        callback(err)
      }
    )
  }

  public updateInfo(params, callback): void {
    const { id } = params
    // Remove privacy data
    const updateData = _.omit(params.params, ['password', 'id'])

    this.update(
      {
        queryCondition: {
          _id: id
        },
        updateData
      },
      callback
    )
  }
}

export default new UserModel()
