import * as _ from 'lodash'
import * as Mongoose from 'mongoose'
//
import BaseModel from './base.model'
import { IProductsCategories } from '../constants/interfaces'
import { ProductsCategoriesSchema } from '../schemas'
//
import { Utils } from '../libs'
//
class ProductsCategoriesModel extends BaseModel {
  protected Model
  constructor() {
    super()
    this.Model = Mongoose.model<IProductsCategories>('Products_Categories', ProductsCategoriesSchema)
  }

  public createCategories(params, callback): any {
    this.Model.create(params, (err, result: IProductsCategories) => {
      let user: any = this.parse(result)
      delete user.password
      callback(err, user)
    })
  }

  getCategoriesByID(params, callback) {
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
  public removeCategories(params, callback) {
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

  public getAllCategories(params: {}, callback): void {
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

  public updateCategories(params, callback): void {
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

export default new ProductsCategoriesModel()
