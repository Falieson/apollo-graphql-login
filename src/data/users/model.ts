// tslint:disable no-any
// import * as casual from 'casual'
import * as bcrypt from 'bcrypt'
import * as mongoose from 'mongoose'
import MongooseModel from '../../utils/mongoose' 
// import { Passport, Profile, View } from './index'

(mongoose as any).Promise = global.Promise
// const ObjectIdType = mongoose.Schema.Types.ObjectId
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
        password: String,
        firstName: String,
        lastName: String,        
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
      const args = {
        _id: new ObjectId(),
        firstName,
        lastName,
        username,
        password: bcrypt.hashSync(password, 10),
      }
      const newUser: any = await this.model.create(args)

      if (newUser) {
        // const {_id: userId} = newUser

        // const newPassport = await Passport.register({
        //   _id: new ObjectId(),
        //   userId,
        //   // active: false,
        //   username,
        // }, password)
        
        // const newProfile: any = await Profile.create({
        //   firstName,
        //   lastName,
        //   userId,
        // })
        
        // const newView = await View.create({
        //   profileId: newProfile && newProfile._id,
        //   views: 0,
        // })

        // newProfile.viewId = newView && newView._id
        // await newProfile.save()

        // newUser.passportId = newPassport._id
        // newUser.profileId = newProfile && newProfile._id
        // await newUser.save()
        return newUser
      }
    } catch (e) { console.error('Mongoose User: ', e)}
  }
}


export default new UserModel()

