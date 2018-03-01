import helpers from '@falieson/js-helpers'
import * as mongoose from 'mongoose'

export const MONGODB_NAME = 'rtv'
export const MONGODB_PORT = 27017
export const MONGODB_PROTOCOL = 'mongodb'
const handleError = helpers.errors.consoleError
const webaddress = helpers.string.webaddress

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
