import * as _ from 'lodash'
import * as Mongoose from 'mongoose'

import BaseModel from './base.model'
import { ILocation } from '../constants/interfaces'
import { LocationSchema } from '../schemas'

class LocationModel extends BaseModel {
  protected Model

  constructor() {
    super()
    this.Model = Mongoose.model<ILocation>('Location', LocationSchema)
  }

  public createLocation(params, callback): any {
    this.Model.create(params, (err, result: ILocation) => {
      let location: any = this.parse(result)
      callback(err, location)
    })
  }

  public getAllLocation(params: {}, callback): void {
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

  public removeLocation(params, callback) {
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
}

export default new LocationModel()
