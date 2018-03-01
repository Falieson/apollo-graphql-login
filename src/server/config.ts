import helpers from '@falieson/js-helpers'
const {string: {webaddress}} = helpers

// # GRAPHQL
export const GRAPHQL_PORT = 3000
export const GRAPHQL_REST = '/graphql'
export const GRAPHQL_EXPLORE = '/graphiql'
export const GRAPHQL_WS = '/subscriptions'

// export const GRAPHQL_URL_WWW = webaddress({
//   // web
//   port: GRAPHQL_PORT,
//   path: '',
// })
export const GRAPHQL_URL_GRAPHIQL = webaddress({
  // explorer
  path: GRAPHQL_EXPLORE,
  port: GRAPHQL_PORT,
})
export const GRAPHQL_URL_GRAPHQL = webaddress({
  // endpoint
  path: GRAPHQL_REST,
  port: GRAPHQL_PORT,
})

export const GRAPHQL_URL_WS = webaddress({
  // endpoint
  path: GRAPHQL_WS,
  port: GRAPHQL_PORT,
  protocol: 'ws',
})


// # MONGODB
export const MONGODB_NAME = 'users'
export const MONGODB_PORT = 27017
export const MONGODB_PROTOCOL = 'mongodb'
