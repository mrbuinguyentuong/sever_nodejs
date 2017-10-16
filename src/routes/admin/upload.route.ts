import { Router } from 'express'
import * as _ from 'lodash'
import * as Boom from 'boom'
import * as async from 'async'
// Libs utils
import { Utils } from '../../libs'
//
import RootRoute from './root.route'
import { Admin } from '../../services'

class UploadRoute extends RootRoute {
  routers: Router

  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    let routers = Router()

    routers.post('/', (req, res) => {
      this.upload(req, res)
    })

    this.routers = routers
  }

  private upload(req, res) {
    const { type } = req.body
    const { files } = req

    async.waterfall(
      [
        // Check file
        done => {
          if (!files) {
            return done(Boom.badData('File is required'))
          }
          done()
        },
        // Check file type
        done => {
          //TODO: check file type later
          done()
        },
        // Call service upload file
        done => {
          Admin.UploadService.uploadImage(
            {
              file: files.file,
              type
            },
            (err, result) => {
              done(err, result)
            }
          )
        }
      ],
      (err, result) => {
        this.responseHandler(res, err, _.assign(result, req.body))
      }
    )
  }
}

export default new UploadRoute().routers
