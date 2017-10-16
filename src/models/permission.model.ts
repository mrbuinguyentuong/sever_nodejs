import * as _ from 'lodash'
import * as Mongoose from 'mongoose'
//
import BaseModel from './base.model'
import { IPermission } from '../constants/interfaces'
import { PermissionSchema } from '../schemas'
//
import { Utils } from '../libs'
//
class PermissionModel extends BaseModel {
  protected Model
  constructor() {
    super()
    this.Model = Mongoose.model<IPermission>('Permission', PermissionSchema)
  }

  public createPermission(params, callback): any {
    this.Model.create(params, (err, result: IPermission) => {
      let permission: any = this.parse(result)
      delete permission.password
      callback(err, permission)
    })
  }

  getPermissionByID(params, callback) {
    const { id } = params

    this.get(
      {
        queryCondition: {
          _id: id
        }
      },
      (err, permission) => {
        if (err) callback('EM0001')
        else callback(null, this.parse(permission)[0])
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
  public getPermissionByName(params, callback) {
    const { name } = params

    this.get(
      {
        queryCondition: {
          name
        },
        limit: 1
      },
      (err, result) => {
        callback(err, result[0])
      }
    )
  }

  public removePermission(params, callback) {
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

  public getAllPermissions(params: {}, callback): void {
    this.get(
      {
        queryCondition: params,
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
    const updateData = _.omit(params, ['password', 'id'])

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

export default new PermissionModel()
