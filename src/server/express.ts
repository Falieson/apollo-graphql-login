import * as bodyParser from 'body-parser'
import * as events from 'events'
import * as express from 'express'
import { createServer } from 'http'
import { graphql, graphiql, graphqlWs } from './middleware/apollo'

import {
  GRAPHQL_PORT,
  GRAPHQL_URL_WWW,
  GRAPHQL_URL_GRAPHIQL,
  GRAPHQL_URL_GRAPHQL,
  GRAPHQL_URL_WS,
} from './config'
import schema from './data/schema'
import passport from './middleware/passport'

const app = express()
const env = process.env.NODE_ENV

class Loader extends events.EventEmitter {
  constructor() {
    super()
  }
  init() {
    // const self = this

    app.use(bodyParser.json());
    
    // PASSPORT INITIALIZE
    app.use(...passport)


    //  Apollo
    app.use(...graphql)
    if (process.env.NODE_ENV !== 'production') {
      app.use(...graphiql)
    }


    // GQL PLAYGROUND CONFIG
    // ISSUE: https://github.com/graphcool/graphql-playground/issues/576
    //  app.use(GRAPHQL_EXPLORE, expressPlayground({ endpoint: GRAPHQL_REST}))

    // Create a http/ws listener for our express app.
    const ws = createServer(app)
    const listener = ws.listen(GRAPHQL_PORT, () => {
      // tslint:disable-next-line no-console

      // http://localhost:3000/
      // http://localhost:3000/graphiql
      // http://localhost:3000/graphql
      // ws://localhost:3000/subscriptions
      // 🔎    www         ${GRAPHQL_URL_WWW}
      console.log(`
      \n\n\n\n\n\n\n\n\n
      🌐      Server  Online      🌐

      📡    endpoint    ${GRAPHQL_URL_GRAPHQL}
      🎮    explorer    ${GRAPHQL_URL_GRAPHIQL}
      ➿    websocket   ${GRAPHQL_URL_WS}
      `)

      graphqlWs(schema, ws)
    })

    if (env === 'development' || env === null) {
      // NOTE: NODEMON ISSUE
      process.on('SIGINT', () => {
        console.log('Bye bye!') // tslint:disable-line no-console
        process.exit() // eslint-disable-line no-process-exit
      })
    }
    
    return listener
  }
}

export default new Loader()
