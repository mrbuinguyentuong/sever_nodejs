import { Router } from 'express'
// Import parent class
import RootRoute from './root.route'

class TestRoute extends RootRoute {
  public routers: Router
  constructor() {
    super()
    this.routers = Router()
    this.init()
  }

  init() {
    /**
		 * Test API Handler
		 */
    this.routers.get('/', (req, res) => {
      res.send({
        message: 'Hello'
      })
    })
  }
}

export default new TestRoute().routers
