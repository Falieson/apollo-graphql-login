import helpers from '@falieson/js-helpers'
import * as bodyParser from 'body-parser'
import * as events from 'events'
import * as express from 'express'
import * as session from 'express-session'
// import expressPlayground from 'graphql-playground-middleware-express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import * as mongoose from 'mongoose'

import { schema } from '../data/'
import { GRAPHQL_EXPLORE, GRAPHQL_PORT, GRAPHQL_REST } from './config'
import passport from '../data/passport/config'

const app = express()
const mongoStore = require('connect-mongo')(session) // tslint:disable-line no-var-requires
const {string: {webaddress}} = helpers
const env = process.env.NODE_ENV

class Loader extends events.EventEmitter {
  constructor() {
    super()
  }
  init() {
    const self = this

    app.use(bodyParser.json());
    // PASSPORT INITIALIZE
    app.use(
      session({
        cookie: { secure: false },
        resave: true,
        saveUninitialized: true,
        secret: 'keyboard cat',
        store: new mongoStore({ mongooseConnection: mongoose.connection })
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(
      GRAPHQL_REST,
      graphqlExpress((req, res) => {
        return {
          schema,
          rootValue: {
            me: req.user
          },
          context: {req}
        }
      })
    )

    // GQL PLAYGROUND CONFIG
    // ISSUE: https://github.com/graphcool/graphql-playground/issues/576
    //  app.use(GRAPHQL_EXPLORE, expressPlayground({ endpoint: GRAPHQL_REST}))
    // GQL PLAYGROUND CONFIG
    app.use(GRAPHQL_EXPLORE, graphiqlExpress({ endpointURL: GRAPHQL_REST}))
    
    // APP STARTUP
    app.listen(GRAPHQL_PORT, () => {
      self.emit('server.loaded')
      // tslint:disable-next-line no-console
      console.log(`\n\n\n\n\n\n\n\n\n
          🌐      GraphQL Server      🌐

        🎮  ${webaddress({ // explorer
        path: GRAPHQL_EXPLORE,
        port: GRAPHQL_PORT,
      })}
        📡  ${webaddress({ // endpoint
        path: GRAPHQL_REST,
        port: GRAPHQL_PORT,
      })}
      `)
    })

    if (env === 'development' || env === null) {
      // NOTE: NODEMON ISSUE
      process.on('SIGINT', () => {
        console.log('Bye bye!') // tslint:disable-line no-console
        process.exit() // eslint-disable-line no-process-exit
      })
    }      
  }
}

export default new Loader()
