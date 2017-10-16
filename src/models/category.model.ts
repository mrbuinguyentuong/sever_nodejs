import * as _ from 'lodash'
import * as Mongoose from 'mongoose'
import * as Boom from 'boom'
//
import BaseModel from './base.model'
import { ICategory } from '../constants/interfaces'
import { CategorySchema } from '../schemas'
//
import { Utils } from '../libs'
//
class CategoryModel extends BaseModel {
  protected Model

  constructor() {
    super()
    this.Model = Mongoose.model<ICategory>('Category', CategorySchema)
  }

  public createCategory(params, callback): any {
    this.Model.create(params, (err, result: ICategory) => {
      if (err) return callback(err)

      callback(null, this.parse(result))
    })
  }

  public getCategoryByID(params, callback) {
    const { id } = params

    this.getFullInfoCategory(
      {
        query: {
          _id: id
        },
        limit: 1
      },
      (err, category) => {
        if (_.size(category) === 0) {
          return callback(Boom.notFound('Category is not found!'))
        }
        if (err) callback(Boom.badGateway('Server is maintenance'))
        else callback(null, category[0])
      }
    )
  }

  public removeCategory(params, callback) {
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

  public getAllCategory(params: {}, callback): void {
    this.getFullInfoCategory(
      {
        query: params,
        limit: 0
      },
      (err, result) => {
        callback(err, result)
      }
    )
  }

  public updateCategory(params, callback): void {
    const { id } = params

    this.update(
      {
        queryCondition: {
          _id: id,
          isRemove: false
        },
        updateData: params
      },
      callback
    )
  }

  /**
   * getCategoryWithoutPupulate
  */
  public getCategoryWithoutPupulate = (params, callback) => {
    const { id } = params

    this.get(
      {
        queryCondition: {
          _id: id
        },
        limit: 1
      },
      (err, result) => {
        callback(err, this.parse(result)[0])
      }
    )
  }

  private getFullInfoCategory(params: any, callback): void {
    const { query } = params

    const limit = _.isUndefined(params.limit) ? 24 : params.limit

    this.Model
      .find({ ...query, isRemove: false })
      .limit(limit)
      .populate({
        path: 'parentCategory',
        match: {
          isRemove: false
        }
      })
      .exec((err, result) => {
        callback(err, this.parse(result))
      })
  }
}

export default new CategoryModel()
