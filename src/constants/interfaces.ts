import * as Mongoose from 'mongoose'

interface IUser extends Mongoose.Document {
  id: string
  password: string
  username: string
  firstName: string
  lastName: string
  info: string
  isAdmin: boolean
  role: string
  group: string
  isRemove: boolean
  status: boolean
  createdAt: string
  updatedAt: string
}

interface ICategory extends Mongoose.Document {
  id: string
  name: string
  slug: string
  parentCategory: string
  parentCategoryID: string
  description: string
}

interface IPermission extends Mongoose.Document {
  id: string
  name: string
  url: string
  parent: string
  isRemove: boolean
}

interface IGroup extends Mongoose.Document {
  id: string
  name: string
  permission_id: string
  isRemove: boolean
}

interface IPost extends Mongoose.Document {
  id: string
  name: string
  description
  content: string
  catID: string
  image: string
  slug: string
  active: boolean
  createdAt: string
  isRemove: boolean
}

interface ILocation extends Mongoose.Document {
  id: string
  name: string
  parent: string
  active: boolean
  isRemove: boolean
}

export { IUser, ICategory, IPermission, IGroup, IPost, ILocation }
