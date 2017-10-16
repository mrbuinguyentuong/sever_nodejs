import * as async from 'async'
import { Router } from 'express'
import * as _ from 'lodash'
import * as Boom from 'boom'
//
import RootRoute from './root.route'
import { Admin } from '../../services'
//
class CategoryRoute extends RootRoute {
  routers: Router

  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    let routers = Router()

    // Admin add new user
    routers.post('/', (req, res) => {
      Admin.CategoryService.addCategory(req.body, (err, result) => {
        if (err) {
          return this.responseHandler(res, err, undefined)
        }
        this.responseHandler(res, err, result)
      })
    })

    routers.delete('/', (req, res) => {
      Admin.CategoryService.deleteCategory(req.body, err => {
        this.responseHandler(res, Boom.badRequest(err), {
          message: 'Delete category success'
        })
      })
    })

    routers.get('/all', (req, res) => {
      Admin.CategoryService.getAllCategory({}, (err, result) => {
        if (err) {
          this.responseHandler(res, Boom.badRequest(err), null)
        } else {
          this.responseHandler(res, null, result)
        }
      })
    })

    routers.get('/', (req, res) => {
      const { id } = req.query

      async.waterfall(
        [
          // Check require id
          done => {
            if (_.isEmpty(id)) return done(Boom.badData('Id is required'))
            done()
          },
          // Call service get category
          done => {
            Admin.CategoryService.getCategory({ id }, (err, result) => {
              done(err, result)
            })
          }
        ],
        (err: string | object, result: any) => {
          if (err) {
            this.responseHandler(res, err, null)
          } else {
            this.responseHandler(res, null, result)
          }
        }
      )
    })

    routers.put('/', (req, res) => {
      const { id } = req.query
      Admin.CategoryService.updateCategory(
        { ...req.body, id },
        (err, result) => {
          this.responseHandler(res, Boom.badData(err), result)
        }
      )
    })

    this.routers = routers
  }
}
export default new CategoryRoute().routers
