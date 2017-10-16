import { Router } from 'express'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Libs utils
import { Utils } from '../../libs'
import { IUser } from '../../constants/interfaces'
//
import RootRoute from './root.route'
import { Admin } from '../../services'

class PermissionRoute extends RootRoute {
  routers: Router

  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    let routers = Router()
    routers.get('/', (req, res) => {
      Admin.PermissionService.getAllPermissions({}, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    // Add new permission
    routers.post('/add', (req, res) => {
      const params = _.pick(req.body, ['name', 'url', 'parent'])
      Admin.PermissionService.addNew(params, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Get Permission By ID
    routers.get('/getPermissionByID/:id', (req, res) => {
      Admin.PermissionService.getPermissionByID(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Update Permission Info
    routers.put('/', (req, res) => {
      Admin.PermissionService.updateInfo(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Delete Permission
    routers.delete('/', (req, res) => {
      Admin.PermissionService.deletePermission(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    routers.get('/getListParent', (req, res) => {
      Admin.PermissionService.getListOption(req, (err, result) => {
        if (!err) {
          this.responseHandler(res, Boom.badData(err), result)
        }
      })
    })

    this.routers = routers
  }
}

export default new PermissionRoute().routers
