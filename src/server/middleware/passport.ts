import * as session from 'express-session'
import * as mongoose from 'mongoose'
import * as passport from 'passport'
import { Passport } from '../data/models'

passport.use(Passport.model.Collection.createStrategy())
passport.serializeUser(Passport.model.Collection.serializeUser())
passport.deserializeUser(Passport.model.Collection.deserializeUser())

const mongoStore = require('connect-mongo')(session)

console.warn('session.secret: "keyboard cat" is insecure')
export default [
  session({
    cookie           : { secure: false },
    resave           : true,
    saveUninitialized: true,
    secret           : 'keyboard cat',
    store            : new mongoStore({ mongooseConnection: mongoose.connection })
  }),
  passport.initialize(),
  passport.session()
]
