/**
 * DatabaseManager
 */
import * as mongoose from 'mongoose'
import config from '../configs/config'
import * as bluebird from 'bluebird'

export class DatabaseManager {
  protected connection

  /**
  * function start connect with databse
  *
  * @memberof DatabaseManager
  */
  public init() {
    let connection

    connection = mongoose.connection

    mongoose.connect(config.database.host, {
      useMongoClient: true,
      promiseLibrary: bluebird
    })

    connection.on('openUri', () => {
      console.log('Connect database is open')
    })

    connection.on('connected', () => {
      console.log('Connected to database')
    })

    connection.on('reconnect', () => {
      console.log('Reconnect database')
    })

    connection.on('error', e => {
      console.log('Connect database failure')
    })

    this.connection = connection
  }
}

export default new DatabaseManager()