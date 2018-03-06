// Libs
import * as async from 'async'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Model
import { ProductsCategoriesModel } from '../../models'
import { IProductsCategories } from '../../constants/interfaces'
//
//
class ProductsCategoriesServices {
  /**
     * Service get register new user
     * @param params:  {}
     * @param callback
     */

  public async createCategories(params, callback): Promise<any> {
    await ProductsCategoriesModel.createCategories(
      params,
      (err, result) => {
        if (_.size(result) === 0) {
          return callback('Categories is exist')
        }
        callback(err, result)
      }
    )
  }

  getCategoriesInfo(params, callback) {
    const { productsId } = params

    async.waterfall(
      [
        // Check user is exist
        done => {
          ProductsCategoriesModel.getCategoriesByID(
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

  public getAllCategories(params, callback) {
    ProductsCategoriesModel.getAllCategories(params, callback)
  }

  public getCategoriesByID(req, callback) {
    ProductsCategoriesModel.getCategoriesByID(req.params, callback)
  }

  public updateCategories(req, callback) {
    ProductsCategoriesModel.updateCategories(req.body, callback)
  }

  public removeCategories(req, callback) {
    const { id } = req.body
    ProductsCategoriesModel.removeCategories({ id }, callback)
  }
}

export default new ProductsCategoriesServices()
