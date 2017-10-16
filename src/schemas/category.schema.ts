import * as Mongoose from 'mongoose'
import * as _ from 'lodash'
import * as uniqueValidator from 'mongoose-unique-validator'
import * as paginate from 'mongoose-paginate'
import * as Bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as Boom from 'boom'
//
const Schema = Mongoose.Schema
//
import config from '../configs/config'

import { options, validateMinLength } from './root.schema'

const CategorySchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Category name is required'],
      dropDups: true
    },
    slug: {
      type: String,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    isRemove: {
      type: Boolean,
      default: false
    }
  },
  { ...options, collection: 'Category' }
)

CategorySchema.pre('validate', function(next) {
  next()
}).post('validate', function(error: any, doc, next) {
  if (error.errors.name.kind === 'unique')
    return next(Boom.conflict('Category is exist'))

  next()
})

// Add plugin for mongoose
CategorySchema.plugin(uniqueValidator)

export default CategorySchema
