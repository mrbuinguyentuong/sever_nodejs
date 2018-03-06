// Libs
import * as async from 'async'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Model
import { ProductsModel } from '../../models'
import { IProducts } from '../../constants/interfaces'
//
//
class ProductsServices {
  /**
     * Service get register new user
     * @param params:  {}
     * @param callback
     */

  public async createProducts(params, callback): Promise<any> {
    await ProductsModel.createProducts(params, (err, result) => {
      if (_.size(result) === 0) {
        return callback('Products is exist')
      }
      callback(err, result)
    })
  }

  getProductsInfo(params, callback) {
    const { productsId } = params

    async.waterfall(
      [
        // Check user is exist
        done => {
          ProductsModel.getProductsByID(
            {
              productsId
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

  public getAllProducts(params, callback) {
    ProductsModel.getAllProducts(params, callback)
  }

  public getProductsByID(req, callback) {
    ProductsModel.getProductsByID(req.params, callback)
  }

  public updateProducts(req, callback) {
    ProductsModel.updateProducts(req.body, callback)
  }

  public removeProducts(req, callback) {
    const { id } = req.body
    ProductsModel.removeProducts({ id }, callback)
  }
}

export default new ProductsServices()
