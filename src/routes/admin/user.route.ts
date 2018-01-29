import { Router } from 'express'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Libs utils
import { Utils } from '../../libs'
import { IUser } from '../../constants/interfaces'
//
import RootRoute from './root.route'
import { Admin } from '../../services'

class UserRoute extends RootRoute {
  routers: Router

  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    let routers = Router()

    // User Login Handler
    routers.post('/login', (req, res) => {
      const params: IUser = req.body
      Admin.UserServices.loginService(params, (err, result) => {
        return this.responseHandler(res, err, result)
      })
    })

    routers.get('/', (req, res) => {
      Admin.UserServices.getAllUser({}, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    // Register new user
    routers.post('/register', (req, res) => {
      const params = _.pick(req.body, [
        'username',
        'password',
        'email',
        'lastName',
        'firstName',
        'role',
        'group',
        'status'
      ])
      Admin.UserServices.registerService(params, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Get User By ID
    routers.get('/getUserByID/:id', (req, res) => {
      Admin.UserServices.getUserByID(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Update User Info
    routers.put('/', (req, res) => {
      Admin.UserServices.updateInfo(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    routers.delete('/', (req, res) => {
      console.log(req.body)
      Admin.UserServices.deleteUser(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    this.routers = routers
  }
}

export default new UserRoute().routers
