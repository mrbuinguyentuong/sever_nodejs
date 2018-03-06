import * as Mongoose from 'mongoose'
import * as _ from 'lodash'
import * as uniqueValidator from 'mongoose-unique-validator'
import * as paginate from 'mongoose-paginate'
import * as Bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
//
import config from '../configs/config'

import { options, validateMinLength } from './root.schema'

const ProductsCategoriesSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Title is required'],
      dropDups: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Slug is required'],
      dropDups: true,
      trim: true
    },
    isRemove: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Number,
      trim: true
    },
    visibled: {
      type: Boolean,
      default: true
    },
    description: {
      type: String
    },
    deletedAt: {
      type: Date,
      default: Date.now
    }
  },
  { ...options, collection: 'Products' }
)

export default ProductsCategoriesSchema
