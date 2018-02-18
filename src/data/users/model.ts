// tslint:disable no-any
import * as mongoose from 'mongoose'
import MongooseModel from '../../utils/mongoose' 
import Passport from '../passport/model'

(mongoose as any).Promise = global.Promise
const ObjectIdType = mongoose.Schema.Types.ObjectId
const ObjectId = mongoose.Types.ObjectId

class UserModel {
  model: any

  constructor() {
    this.init()
  }

  init() {
    this.model = new MongooseModel({
      schema: { 
        username: String,
        passportId: { type: ObjectIdType, ref: 'Passport' },
        profileId: { type: ObjectIdType, ref: 'Profile' },
      },
      title : 'User',
    })
    return this.model
  }

  async register({
      firstName,
      lastName,
      username,
      password,
    }: {
      firstName: string,
      lastName: string,
      username: string,
      password: string,
    }) {
    try { 
      const newUser: any = await this.model.create({username})

      if (newUser) {
        const {_id: userId} = newUser

        const newPassport: any = await Passport.register({
          _id: new ObjectId(),
          userId,
          username,
        }, password)
        
        newUser.passportId = newPassport._id
        await newUser.save()

        return newUser
      }
    } catch (e) { console.error('Mongoose User: ', e)}
  }
}


export default new UserModel()

