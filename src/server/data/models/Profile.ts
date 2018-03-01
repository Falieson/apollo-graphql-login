// tslint:disable no-any
import * as mongoose from 'mongoose'
import MongooseFactory from './MongooseFactory' 

(mongoose as any).Promise = global.Promise
const ObjectIdType = mongoose.Schema.Types.ObjectId

class ProfileModel {
  model: any

  constructor() {
    this.init()
  }

  init() {
    this.model = new MongooseFactory({
      schema: { 
        emails: [{
          address: String,
          verified: Boolean,
        }],
        firstName: String,
        lastName : String,
        userId: { type: ObjectIdType, ref: 'User' },
      },
      title : 'Profile',
    })
    return this.model
  }
}


export default new ProfileModel()

