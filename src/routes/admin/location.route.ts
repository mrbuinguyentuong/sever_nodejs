import { Router } from 'express'
import * as _ from 'lodash'
import * as Boom from 'boom'

import RootRoute from './root.route'
import { Admin } from '../../services'

class LocationRoute extends RootRoute {
  routers: Router

  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    let routers = Router()

    routers.get('/', (req, res) => {
      Admin.LocationService.getAllLocation({}, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    routers.post('/add', (req, res) => {
      const params = _.pick(req.body, ['name', 'parent'])
      Admin.LocationService.addNew(params, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    routers.delete('/', (req, res) => {
      Admin.LocationService.deletelocation(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    this.routers = routers
  }
}

export default new LocationRoute().routers
