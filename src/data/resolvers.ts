 // tslint:disable no-any
 import { Models } from './'
const {User} = Models

 export default {
  Mutation: {
    addUser(_: any, args: any) { return User.register(args) },
    // async loginUser(_: any, args: any, ctx: any) { 
    //   const {username, password} = args
    //   return Passport.login(ctx, username, password)
    // }, 
    // logoutUser(_: any, args: any) { return Passport.logout(args) }, 
  },
  // Passport: {
  //   user(passport: any) { return User.findOne({ _id: passport.userId}) },
  // },
  Query: {
    user(_: any, args: any) { return User.model.findOne(args) },
    // allUsers(_: any, args: any) { return User.find(args) },
    // passport(_: any, args: any) { return Passport.findOne(args) },
    // allProfiles(_: any, args: any) { return Profile.find(args) },
  },
  // User: {
  //   passport(user: any) { return Passport.findOne(user.passportId) },
  //   profile(user: any) { return Profile.findOne(user.profileId) },
  // },
}
