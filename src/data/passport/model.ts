// tslint:disable no-any
// import * as casual from 'casual'
import * as mongoose from 'mongoose'
import * as passport from 'passport'
import * as passportLocalMongoose from 'passport-local-mongoose'
import MongooseModel from '../../utils/mongoose' 
// import { Passport, Profile, View } from './index'

(mongoose as any).Promise = global.Promise
const ObjectIdType = mongoose.Schema.Types.ObjectId

class PassportModel {
  model: any

  constructor() {
    this.init()
  }

  init() {
    this.model = new MongooseModel({
      plugin: passportLocalMongoose,
      pluginOptions: {
        usernameUnique: true,
      },
      schema: { 
        userId: { type: ObjectIdType, ref: 'User' }
      },
      title : 'Passport',
    })
    return this.model
  }

  
  register(obj: any, pass: any) {
    return new Promise(resolve =>
      this.model.Collection.register(obj, pass,
        (err: any, res: any) => resolve(res)))
  }
  
  async login (ctx: any, user: string, pass: string) {
    let res = {};
    if (typeof ctx.req.user === 'undefined') {
      ctx.req.body.username = user
      ctx.req.body.password = pass
  
      const auth = new Promise(function(resolve, reject) {
        passport.authenticate('local', function(err, user, info) {
          if (err) {
            reject(err);
          }
          if (info && info.name && info.name.indexOf('Error') !== -1) {
            reject(new Error(info.message));
          }
          if (!user) {
            reject(new Error('No user returned'));
          }
          ctx.req.logIn(user, function(err: any) {
            if (err) {
              reject(err);
            }
            resolve(user);
          });
        })(ctx.req);
      });
  
      await auth
        .then(user => {
          res = user;
        })
        .catch(err => {
          res = err;
        });
    } else {
      res = new Error('Already logged in');
    }
    return res;
  }
  
  async logout (username: string) {
    return new Promise(resolve =>
      this.model.Collection.logout(username,
        (err: any, res: any) => resolve(res)))
  }
}


export default new PassportModel()

