import * as passport from 'passport'
import Passport from './model'


passport.use(Passport.model.Collection.createStrategy())
passport.serializeUser(Passport.model.Collection.serializeUser())
passport.deserializeUser(Passport.model.Collection.deserializeUser())

export default passport