import * as _ from 'lodash'
import * as Mongoose from 'mongoose'
//
import BaseModel from './base.model'
import { IGroup } from '../constants/interfaces'
import { GroupSchema } from '../schemas'
//
import { Utils } from '../libs'
//
class GroupModel extends BaseModel {
  protected Model
  constructor() {
    super()
    this.Model = Mongoose.model<IGroup>('Group', GroupSchema)
  }

  public createGroup(params, callback): any {
    this.Model.create(params, (err, result: IGroup) => {
      let group: any = this.parse(result)
      delete group.password
      callback(err, group)
    })
  }

  getGroupByID(params, callback) {
    const { id } = params

    this.get(
      {
        queryCondition: {
          _id: id
        }
      },
      (err, group) => {
        if (err) callback('EM0001')
        else callback(null, this.parse(group)[0])
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
  public getGroupByName(params, callback) {
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

  public removeGroup(params, callback) {
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

  public getAllGroup(params: {}, callback): void {
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

export default new GroupModel()
