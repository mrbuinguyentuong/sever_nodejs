import { Router } from 'express'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Libs utils
import { Utils } from '../../libs'
import { IProducts } from '../../constants/interfaces'
//
import RootRoute from './root.route'
import { Admin } from '../../services'

class ProductsCategoriesRoute extends RootRoute {
  routers: Router

  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    let routers = Router()

    routers.get('/', (req, res) => {
      Admin.ProductsCategoriesService.getAllCategories({}, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    // Create Products
    routers.post('/create', (req, res) => {
      const params = _.pick(req.body, [
        'title',
        'slug',
        'description',
        'content',
        'visibled'
      ])
      Admin.ProductsCategoriesService.createCategories(params, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Get Products By ID
    routers.get('/products/:id', (req, res) => {
      Admin.ProductsCategoriesService.getProductsByID(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Update Products Info
    routers.put('/', (req, res) => {
      Admin.ProductsCategoriesService.updateProducts(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Remove Products
    routers.delete('/', (req, res) => {
      Admin.ProductsCategoriesService.removeProducts(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })
    this.routers = routers
  }
}

export default new ProductsCategoriesRoute().routers
