// tslint:disable no-any
import helpers from '@falieson/js-helpers'

import { pubsub } from '../middleware/apollo'
import { User, Passport, Profile, } from './models'

const handleError = helpers.errors.consoleError

const MyUser = (args: any, _?: any, ctx?: any) => {
  let userId = false
  if(_ && _.me){
    userId = _.me.userId
    return User.model.findOne(userId)

  } else if(ctx && ctx.req && ctx.req.user) {
    userId = ctx.req.user.userId
    return User.model.findOne(userId)  

  } else {
    handleError('Must be logged in...')
  }
}
const MyPassport = (args: any, _?: any, ctx?: any) => {
  let userId = false
  if(_ && _.me){
    userId = _.me.userId
    return Passport.model.findOne({userId})

  } else if(ctx && ctx.req.user) {
    userId = ctx.req.user.userId
    return Passport.model.findOne({userId})
    
  } else {
    handleError('Must be logged in...')
  }
}
const MyProfile = (args: any, _?: any, ctx?: any) => {
  let userId = false
  if(_ && _.me){
    userId = _.me.userId
  return Profile.model.findOne({userId})

  } else if(ctx && ctx.req.user) {
    userId = ctx.req.user.userId
  return Profile.model.findOne({userId})  
    
  } else {
    handleError('Must be logged in...')
  }
}

export default {
  User: {
    passport(user: any, args: any, ctx: any) {
      return MyPassport({_id: user.passportId}, undefined, ctx)
    },
    profile(user: any, args: any, ctx: any) {
      return MyProfile({_id: user.profileId}, undefined, ctx)
    },
  },
  Passport: {
    user(passport: any, args: any, ctx: any) {
      return MyUser({ _id: passport.userId}, undefined, ctx)
    },
  },
  Profile: {
    user(profile: any, args: any, ctx: any) {
      return MyUser({ _id: profile.userId}, undefined, ctx)
    },
  },
  Query: {
    user(_: any, args: any, ctx: any) {
      return MyUser(args, _, ctx)
    },
    passport(_: any, args: any, ctx: any) {
      return MyPassport(args, _, ctx)
    },
    profile(_: any, args: any, ctx: any) {
      return MyProfile(args, _, ctx)
    },
  },
  Mutation: {
    addUser(_: any, args: any, ctx: any) {
      return User.register(ctx, args)
    },
    async loginUser(_: any, args: any, ctx: any) { 
      const {username, password} = args
      return Passport.login(ctx, username, password)
    }, 
    logoutUser(_: any, args: any, ctx: any) { return Passport.logout(ctx) }, 
  },
  Subscription: {
    user: {
      subscribe(_: any, args: any, ctx: any) {
        setInterval(() => {
          const res = MyUser(args, _, ctx)
          console.log(res)
          pubsub.publish('myUser',  res)
        }, 2000)
        return pubsub.asyncIterator('myUser')
      }
    },
    me: {
      async subscribe(_: any, args: any, ctx: any) {
        await setInterval(() => {
          // console.log({ _ }) // {_: undefined}
          // console.log({ ctx, req: ctx.req }) // {ctx: {}, req: undefined}
          const query =  ctx.req ? MyUser({ _id:  ctx.req.user}, _, ctx): { userId: 'false' }
          pubsub.publish('me', { me: query })
        }, 2000)
        console.log(ctx.req.user)
        return pubsub.asyncIterator('me')
      }
    }
  },
}
