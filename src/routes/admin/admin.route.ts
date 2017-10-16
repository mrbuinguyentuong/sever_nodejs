import { Router } from 'express'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Libs utils
import { Utils } from '../../libs'
import { IUser } from '../../constants/interfaces'
//
import RootRoute from './root.route'
import { Admin } from '../../services'

class AdminRoute extends RootRoute {
  routers: Router

  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    let routers = Router()

    // Admin add new user
    routers.post('/user', (req, res) => {
      Admin.AdminService.addNewUser(req.body, (err, result) => {
        this.responseHandler(res, Boom.conflict(err), result)
      })
    })

    routers.delete('/user', (req, res) => {
      Admin.AdminService.deleteUser(req.body, err => {
        this.responseHandler(res, Boom.badRequest(err), {
          message: 'Delete user success'
        })
      })
    })

    routers.get('/user', (req, res) => {
      Admin.AdminService.getAllUser({}, (err, result) => {
        if (err) {
          this.responseHandler(res, Boom.badRequest(err), null)
        } else {
          this.responseHandler(res, null, result)
        }
      })
    })

    routers.put('/user', (req, res) => {
      Admin.AdminService.updateUserInfo(req.body, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    this.routers = routers
  }
}

export default new AdminRoute().routers
