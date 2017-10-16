import * as _ from 'lodash'
import { LocationModel } from '../../models'
import * as Boom from 'boom'

class LocationService {
  public async addNew(params, callback): Promise<any> {
    await LocationModel.createLocation(params, (err, result) => {
      if (_.size(result) === 0) {
        return callback('Location is exist')
      }
      callback(err, result)
    })
  }

  public getAllLocation(params, callback) {
    LocationModel.getAllLocation(params, callback)
  }

  public deletelocation(req, callback) {
    const { id } = req.body
    LocationModel.removeLocation({ id }, callback)
  }
}

export default new LocationService()
