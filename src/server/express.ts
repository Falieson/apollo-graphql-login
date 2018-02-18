import helpers from '@falieson/js-helpers'
import * as bodyParser from 'body-parser'
import * as events from 'events'
import * as express from 'express'
import expressPlayground from 'graphql-playground-middleware-express'
import { graphqlExpress } from 'graphql-server-express'

// console.log(helpers)
import { schema } from '../data/'
import { GRAPHQL_EXPLORE, GRAPHQL_PORT, GRAPHQL_REST } from './config'

const app = express()
const {string: {webaddress}} = helpers
const env = process.env.NODE_ENV

class Loader extends events.EventEmitter {
  constructor() {
    super()
  }
  init() {
    const self = this

    app.use(bodyParser.json());
    app.use(
      GRAPHQL_REST,
      graphqlExpress((req, res) => {
        console.log('session: ', req.sessionID)  
        return {
          schema,
          // rootValue,
          context: {req}
        }
      })
    )

    // GQL PLAYGROUND CONFIG
    app.use(GRAPHQL_EXPLORE, expressPlayground({ endpoint: GRAPHQL_REST}))
    
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
