import * as Mongoose from 'mongoose'
import * as _ from 'lodash'
import * as Boom from 'boom'
//
import { DatabaseManager } from '../libs/database.manager'

class BaseModel extends DatabaseManager {
  private Schema
  protected Model

  constructor() {
    super()
  }

  save(params, callback) {
    const self = this
    let model

    model = new self.Model(params)
    model.save(err => {
      if (err) {
        callback(err)
      } else {
        callback(null)
      }
    })
  }

  parse(params) {
    let result = [],
      tmp = {}

    if (_.isArray(params)) {
      _.forEach(params, param => {
        param = _.isEmpty(param) ? null : param.toJSON()
        tmp = _.omit(param, ['__v', '_id'])
        result.push(tmp)
      })
    } else {
      params = _.isEmpty(params) ? null : params.toJSON()
      tmp = _.omit(params, ['__v', '_id'])
      result.push(tmp)
    }
    return result
  }

  get(params, callback) {
    const self = this
    const { queryCondition, limit } = params

    params.limit = _.isUndefined(params.limit) ? 24 : params.limit

    self.Model
      .find({ ...queryCondition, isRemove: false })
      .limit(limit)
      .exec((err, result) => {
        callback(err, result)
      })
  }

  update(params, callback) {
    const self = this
    const { updateData, queryCondition } = params
    self.Model.findOneAndUpdate(queryCondition, updateData, err => {
      if (err) return callback('EM0000')
      self.get({ queryCondition }, (er, result) => {
        if (er) return callback('EM0000')
        else callback(null, result[0])
      })
    })
  }

  protected errorHandler(err) {
    if (err.name === 'MongoError') {
      if (err.message.indexOf('duplicate key error') !== -1) {
        return Boom.conflict(err.message)
      }
    }
    return err
  }
}

export default BaseModel
