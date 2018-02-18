import { makeExecutableSchema } from 'graphql-tools' // addMockFunctionsToSchema,
// import mocks from './mocks'
import resolvers from './resolvers'
import {Models} from '../data'

export let typeDefs = `
type User {
  _id: String
  username: String  
  password: String
  firstName: String
  lastName: String
}

type Query {
  user(_id: String, username: String): User
}

type Mutation {
  addUser(username: String!, password: String!, firstName: String!, lastName: String!): User
}
`

console.log({typeDefs})

const schema = makeExecutableSchema({ typeDefs, resolvers })
// addMockFunctionsToSchema({ schema, mocks })

export default schema
