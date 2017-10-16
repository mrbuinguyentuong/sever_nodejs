import * as Mongoose from 'mongoose'
import * as _ from 'lodash'
import * as uniqueValidator from 'mongoose-unique-validator'
import * as Bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import config from '../configs/config'
import { options, validateMinLength } from './root.schema'

const LocationSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      result: [true, 'Location is required'],
      dropDups: true,
      trim: true
    },
    parent: {
      type: String,
      dropDups: true,
      trim: true
    },
    active: {
      type: Boolean,
      default: true
    },
    isRemove: {
      type: Boolean,
      default: false
    }
  },
  { ...options, collection: 'Location' }
)

LocationSchema.plugin(uniqueValidator)

LocationSchema.post('save', function(error, doc, next) {
  if (error.name === 'ValidationError') next(new Error('Location is exist'))
  else next(error)
})

export default LocationSchema
