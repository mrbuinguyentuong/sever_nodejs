import * as Boom from 'boom'
import { Router } from 'express'
import * as fileUpload from 'express-fileupload'
// Import middleware
//
import {
  RootRoute,
  AdminRoute,
  UserRoute,
  CategoryRoute,
  UploadRoute,
  PermissionRoute,
  GroupRoute,
  LocationRoute,
  ProductsRoute,
  ProductsCategoriesRoute
} from './admin'
//
const rootHandler = new RootRoute()
//
class APIHandler {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  private init(): void {
    // Check authentication
    // /this.router.use(rootHandler.authenHandler);

    // Test API Handler
    // this.router.use('/', TestHandler);

    // User API Handler
    this.router.use('/user', UserRoute)

    this.router.use('/upload', fileUpload(), UploadRoute)

    /**
     * Require admin to call API
     */

    //this.router.use(rootHandler.checkAdminPermission)

    // Admin API Handler
    this.router.use('/admin', AdminRoute)

    //User API Handler
    this.router.use('/admin/user', rootHandler.authenHandler, UserRoute)

    //Permission API Handler
    this.router.use(
      '/admin/permission',
      rootHandler.authenHandler,
      PermissionRoute
    )

    //Group API Handler
    this.router.use('/admin/group', rootHandler.authenHandler, GroupRoute)

    // Category API Handler
    this.router.use('/admin/category', CategoryRoute)

    // Location API Handler
    this.router.use('/admin/location', LocationRoute)

    // Products API Handler
    this.router.use('/admin/products', ProductsRoute)

    // Products categories API Handler
    this.router.use('/admin/products/categories', ProductsCategoriesRoute)
  }
}

const router = new APIHandler().router

export default router
