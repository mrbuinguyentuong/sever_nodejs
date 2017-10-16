import * as http from 'http'
import * as express from 'express'
import * as domain from 'domain'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import * as cors from 'cors'

import router from './routes'
import DatabaseManager from './libs/database.manager'
import config from './configs/config'

const port = config.port
let databaseManager

class App {
  private app
  private httpServer
  private serverDomain

  constructor() {
    this.serverDomain = domain.create()
    this.serverDomain.on('error', error => {
      console.log('Domain error caught', error)
      this.shutdown()
    })
    this.serverDomain.run(this.init)

    /**
    * Connect to database
    * @type {DatabaseManager}
    */
    DatabaseManager.init()
  }
  private init() {
    let app
    let httpServer

    app = express()
    httpServer = http.createServer(app)

    /**
    * Apply middleware
    */
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors())
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
      res.header(
        'Access-Control-Allow-Headers',
        'accept, Content-Type, Authorization, Content-Length, X-Requested-With'
      )
      if ('OPTIONS' === req.method) {
        res.send(200)
      }
      else {
        next()
      }
    })
    app.use(express.static(path.join(__dirname, 'public')))
    app.use('/', router)

    httpServer.listen(port, () => {
      console.log('Server listening on localhost ' + port)
    })

    this.app = app
    this.httpServer = httpServer
  }
  /*
  * Catch event server start with error
  */
  private shutdown() {
    console.log('Shutting down server')
    const { httpServer } = this

    httpServer.close(() => {
      databaseManager.disconnect(() => {
        console.log('DB disconnected, exiting process')
        process.exit(0)
      })
    })
  }
}
const app = new App()