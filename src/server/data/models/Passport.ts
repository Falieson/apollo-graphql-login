// tslint:disable no-any
import * as mongoose from 'mongoose'
import * as passport from 'passport'
import * as passportLocalMongoose from 'passport-local-mongoose'

// import { ACTIONS as notificationActions } from '../../../src/reducers/notifications'
// import { store as Store } from '../../middleware/reactApplication/'
import MongooseFactory from './MongooseFactory' 

(mongoose as any).Promise = global.Promise
const ObjectIdType = mongoose.Schema.Types.ObjectId

class PassportModel {
  model: any

  constructor() {
    this.init()
  }

  _newWarning(message: string) {
    console.warn(message)
  }
  
  _newError(message: string) {
    console.error(message)
  }

  init() {
    this.model = new MongooseFactory({
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
    const newError = (m: string) => this._newError(m)
    if (typeof ctx.req.user === 'undefined') {
      ctx.req.body.username = user
      ctx.req.body.password = pass
  
      const auth = new Promise(function(resolve, reject) {
        passport.authenticate('local', function(err, user, info) {
          if (err) {
            newError(err)
            reject(err);
          }
          if (info && info.name && info.name.indexOf('Error') !== -1) {
            newError(info.message)
            reject(new Error(info.message));
          }
          if (!user) {
            reject(new Error('No user returned'));
          }
          ctx.req.logIn(user, function(err: any) {
            if (err) {
              newError(err)
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
      const message = 'Already logged in'
      this._newWarning(message)
      res = new Error(message);
    }
    return res;
  }
  
  
  async logout (ctx: any) {
    let res: any = { result: true };
    if (typeof ctx.req.user === 'undefined') {
      const message = 'Not logged in, can\'t log out'
      this._newWarning(message)
      res = new Error(message);
    }
    ctx.req.logout();
    return res;
  }
}


export default new PassportModel()

