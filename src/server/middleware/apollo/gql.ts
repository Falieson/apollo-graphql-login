import { graphqlExpress } from "apollo-server-express"

import { GRAPHQL_REST } from '../../config'
import schema from '../../data/schema'

const graphqlHandler = graphqlExpress((req: any): any => { // tslint:disable-line no-any
  // console.log('SessionID: ', req.sessionID)

  const query = req.query.query || req.body.query
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.')
  }
  return {
    schema,
    context: {
      req
    },
    rootValue: {
      me: req.user
    },
    debug      : true,
    pretty     : process.env.NODE_ENV !== 'production',
    formatError: (error: any) => ({ // tslint:disable-line no-any
      message  : error.message,
      state    : error.originalError && error.originalError.state,
      locations: error.locations,
      path     : error.path
    })
  }
})

const apolloMiddleware = [
  GRAPHQL_REST,
  graphqlHandler
]

export default apolloMiddleware
