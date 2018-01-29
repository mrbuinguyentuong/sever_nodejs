// Libs
import * as async from 'async'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Model
import { PermissionModel } from '../../models'
import { IUser } from '../../constants/interfaces'
//
//
class PermissionServices {
  /**
     * Service get register new user
     * @param params:  {}
     * @param callback
     */

  public async addNew(params, callback): Promise<any> {
    await PermissionModel.createPermission(params, (err, result) => {
      if (_.size(result) === 0) {
        return callback('Permission is exist')
      }
      callback(err, result)
    })
  }

  getUserInfo(params, callback) {
    const { userID } = params

    async.waterfall(
      [
        // Check user is exist
        done => {
          PermissionModel.getPermissionByID(
            {
              userID
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

  public getAllPermissions(params, callback) {
    PermissionModel.getAllPermissions(params, callback)
  }

  public getPermissionByID(req, callback) {
    PermissionModel.getPermissionByID(req.params, callback)
  }

  public updateInfo(req, callback) {
    PermissionModel.updateInfo(req.body, callback)
  }

  public deletePermission(req, callback) {
    const { id } = req.body
    PermissionModel.removePermission({ id }, callback)
  }

  // public listOption = []

  // public getListOption(req, callback) {
  //   const { parent, str, selected } = req.query

  //   this.listOption = []
  //   async.waterfall(
  //     [
  //       done => {
  //         PermissionModel.getAllPermissions({}, (err, result) => {
  //           done(err, result)
  //         })
  //       },
  //       (list, done) => {
  //         this.getListParent(list, parent, str, selected)
  //         return done(null, this.listOption)
  //       }
  //     ],
  //     callback
  //   )
  // }
  // //Get List Parent
  // public getListParent(list, parent, str, selected) {
  //   _.forEach(list, val => {
  //     const id = val.id,
  //       name = val.name
  //     if (val.parent === parent) {
  //       if (selected !== '' && id === selected) {
  //         this.listOption = [
  //           ...this.listOption,
  //           { id, name: str + name, selected: true }
  //         ]
  //       } else {
  //         this.listOption = [
  //           ...this.listOption,
  //           { id, name: str + name, selected: false }
  //         ]
  //       }
  //       this.getListParent(list, id, str + ' -- ', selected)
  //     }
  //   })
  // }
}

export default new PermissionServices()
