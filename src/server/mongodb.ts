import * as mongoose from 'mongoose'

import helpers from '@falieson/js-helpers'
import { MONGODB_NAME, MONGODB_PORT, MONGODB_PROTOCOL } from './config'
const handleError = helpers.errors.consoleError
const webaddress = helpers.string.webaddress

// import {Models} from '../data/'
// const { User } = Models
// import fixtures from './fixtures'

class MongodbModel {
  async init() {
    try {
      mongoose.connect(webaddress({
        path    : MONGODB_NAME,
        port    : MONGODB_PORT,
        protocol: MONGODB_PROTOCOL,
      }))
      const mongodb = mongoose.connection
      mongodb.on('error', console.error.bind(console, 'connection error:')) // tslint:disable-line no-console
      mongodb.once('open', () => {
        // User.count({}, (err: any, res: any) => { // tslint:disable-line no-any
        //   if (err) {return handleError(err)}
        //   res === 0 && fixtures() 
        // })
      })
    } catch (err) {
      handleError(err, 'openMongo: ') // tslint:disable-line no-console
    }
  }
}

export default new MongodbModel()
