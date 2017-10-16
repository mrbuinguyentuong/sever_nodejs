import { Router } from 'express'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Libs utils
import { Utils } from '../../libs'
import { IUser } from '../../constants/interfaces'
//
import RootRoute from './root.route'
import { Admin } from '../../services'

class GroupRoute extends RootRoute {
  routers: Router

  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    let routers = Router()

    //Get All Group
    routers.get('/', (req, res) => {
      Admin.GroupService.getAllGroups({}, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    // Add new Group
    routers.post('/add', (req, res) => {
      const params = _.pick(req.body, ['name', 'permission_id'])
      Admin.GroupService.addNew(params, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Get Group By ID
    routers.get('/getGroupByID/:id', (req, res) => {
      Admin.GroupService.getGroupByID(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Update Group Info
    routers.put('/', (req, res) => {
      Admin.GroupService.updateInfo(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    //Delete Group
    routers.delete('/', (req, res) => {
      console.log(req.body)
      Admin.GroupService.deleteGroup(req, (err, result) => {
        this.responseHandler(res, Boom.badData(err), result)
      })
    })

    this.routers = routers
  }
}

export default new GroupRoute().routers
