import * as Mongoose from 'mongoose'
import * as _ from 'lodash'
import * as uniqueValidator from 'mongoose-unique-validator'
import * as paginate from 'mongoose-paginate'
import * as Bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
//
import config from '../configs/config'

import { options, validateMinLength } from './root.schema'

const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
      dropDups: true,
      trim: true,
      validate: {
        validator: function(v) {
          validateMinLength(v, 3)
        },
        message: 'Username must have length 3'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      dropDups: true,
      trim: true,
      validate: {
        validator: function(v) {
          validateMinLength(v, 6)
        },
        message: 'Password must have length 6'
      }
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    },
    isRemove: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      trim: true
    },
    info: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      required: false,
      trim: true,
      default: '2'
    },
    group: {
      type: String,
      required: false,
      trim: true,
      default: ''
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { ...options, collection: 'User' }
)

// Add plugin for mongoose
UserSchema.plugin(uniqueValidator)

const hashPassword = (password: string): string => {
  if (!password) return null

  return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8))
}

UserSchema.methods.validatePassword = function(reqPassword: string) {
  if (!reqPassword) {
    return null
  }
  return Bcrypt.compareSync(reqPassword, this._doc.password)
}

UserSchema.methods.removePrivacyInfo = (user): object => {
  user._doc = _.omit(user._doc, ['password'])
  return user
}

UserSchema.methods.generationToken = (user): string => {
  return jwt.sign(user, config.jwt.secretKey)
}

UserSchema.pre('save', function(next) {
  // If change or update password hash password
  if (this.isModified('password')) this.password = hashPassword(this.password)
  next()
})

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'ValidationError') {
    next(new Error('Username is exist'))
  } else {
    next(error)
  }
})

UserSchema.pre('findOneAndUpdate', function() {
  const password = hashPassword(this.getUpdate().$set.password)

  if (!password) return

  this.findOneAndUpdate(
    {},
    {
      password
    }
  )
})

export default UserSchema
