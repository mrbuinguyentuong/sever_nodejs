// Libs
import * as async from 'async'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Model
import { CategoryModel } from '../../models'
import { ICategory } from '../../constants/interfaces'
import * as Const from '../../constants/const'
//
//
class CategoryService {
  public addCategory(params: ICategory, callback) {
    async.waterfall(
      [
        // Check parentCategory
        done => {
          const { parentCategory } = params

          if (_.isEmpty(parentCategory)) return done()

          CategoryModel.getCategoryWithoutPupulate(
            {
              id: parentCategory
            },
            (err, result) => {
              if (err) return done(Boom.badGateway(Const.ServerMantenance))

              if (_.isEmpty(result))
                return done(Boom.badData(Const.ParentCategoryNotFound))

              done()
            }
          )
        },
        // Create new Category
        done => {
          CategoryModel.createCategory(params, done)
        }
      ],
      (err, result) => {
        callback(err, result)
      }
    )
  }

  public getAllCategory(params, callback) {
    async.waterfall(
      [
        //
        done => {
          CategoryModel.getAllCategory({}, (err, result) => {
            done(err, result)
          })
        }
      ],
      callback
    )
  }

  /**
     * deleteCategory
     */
  public deleteCategory({ id }, callback) {
    async.waterfall(
      [
        //
        done => {
          CategoryModel.removeCategory({ id }, (err, result) => {
            done(err, result)
          })
        }
      ],
      callback
    )
  }

  public updateCategory(params, callback) {
    async.waterfall(
      [
        // Update Category
        done => {
          CategoryModel.updateCategory(params, (err, result) => {
            done(err, result)
          })
        }
      ],
      callback
    )
  }

  public getCategory({ id }, callback) {
    async.waterfall(
      [
        //
        done => {
          CategoryModel.getCategoryByID({ id }, (err, result) => {
            done(err, result)
          })
        }
      ],
      callback
    )
  }
}

export default new CategoryService()
