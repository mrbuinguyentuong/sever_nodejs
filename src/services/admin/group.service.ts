// Libs
import * as async from 'async'
import * as _ from 'lodash'
import * as Boom from 'boom'
// Model
import { GroupModel } from '../../models'
import { IUser } from '../../constants/interfaces'
//
//
class GroupServices {
  public async addNew(params, callback): Promise<any> {
    console.log(params)
    await GroupModel.createGroup(params, (err, result) => {
      if (_.size(result) === 0) {
        return callback('Group is exist')
      }
      callback(err, result)
    })
  }

  getGroupInfo(params, callback) {
    const { userID } = params

    async.waterfall(
      [
        // Check user is exist
        done => {
          GroupModel.getGroupByID(
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

  public getAllGroups(params, callback) {
    GroupModel.getAllGroup(params, callback)
  }

  public getGroupByID(req, callback) {
    GroupModel.getGroupByID(req.params, callback)
  }

  public updateInfo(req, callback) {
    GroupModel.updateInfo(req.body, callback)
  }

  public deleteGroup(req, callback) {
    const { id } = req.body
    GroupModel.removeGroup({ id }, callback)
  }
}

export default new GroupServices()
