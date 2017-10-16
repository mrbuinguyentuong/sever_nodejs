import * as Mongoose from 'mongoose'
import * as _ from 'lodash'
import * as uniqueValidator from 'mongoose-unique-validator'
import * as paginate from 'mongoose-paginate'
import * as Bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
//
import config from '../configs/config'

import { options, validateMinLength } from './root.schema'

const GroupSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required'],
      dropDups: true,
      trim: true
    },
    permission_id: {
      type: String,
      required: false,
      default: ''
    },
    isRemove: {
      type: Boolean,
      default: false
    }
  },
  { ...options, collection: 'Group' }
)

export default GroupSchema
