import * as _ from 'lodash'
import * as Mongoose from 'mongoose'
//
import BaseModel from './base.model'
import { IProducts } from '../constants/interfaces'
import { ProductsSchema } from '../schemas'
//
import { Utils } from '../libs'
//
class ProductsModel extends BaseModel {
  protected Model
  constructor() {
    super()
    this.Model = Mongoose.model<IProducts>('Products', ProductsSchema)
  }

  public createProducts(params, callback): any {
    this.Model.create(params, (err, result: IProducts) => {
      let user: any = this.parse(result)
      delete user.password
      callback(err, user)
    })
  }

  getProductsByID(params, callback) {
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
  public removeProducts(params, callback) {
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

  public getAllProducts(params: {}, callback): void {
    this.get(
      {
        query: params,
        limit: null,
        isRemove: false
        //status: true
      },
      (err, result) => {
        if (!err) return callback(null, result)

        callback(err)
      }
    )
  }

  public updateProducts(params, callback): void {
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

export default new ProductsModel()
