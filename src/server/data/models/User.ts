// tslint:disable no-any
import * as mongoose from 'mongoose'
import MongooseModel from './MongooseFactory' 
import Passport from './Passport'
import Profile from './Profile'

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
        email: String,
        passportId: { type: ObjectIdType, ref: 'Passport' },
        profileId: { type: ObjectIdType, ref: 'Profile' },
      },
      title : 'User',
    })
    return this.model
  }

  async register(ctx: any, args: { // tslint:disable-line no-any
      email: string,
      username: string,
      password: string,
    }) {
    const {
      email,
      username,
      password,
    }  = args
    try { 
      // TODO: check if unique username (useername.toLowerCase() .length === 0)
      const newUser: any = await this.model.create({username})

      if (newUser) {
        const {_id: userId} = newUser

        const newPassport: any = await Passport.register({
          _id: new ObjectId(),
          userId,
          username,
        }, password)
        newUser.passportId = newPassport._id
        // console.log({newUser, newPassport}) // newProfile, newPassport})
        await newUser.save()

        const newProfile: any = await Profile.model.create({
          emails: [{address: email, verified: false}],
          userId,
        })
        newUser.profileId = newProfile._id
        await newUser.save()
        
        await Passport.login(ctx, username, password)

        return newUser
      }
    } catch (e) { console.error('Registering User: ', e)}
  }
}


export default new UserModel()

