import { makeExecutableSchema } from 'graphql-tools' // addMockFunctionsToSchema,
// import mocks from './mocks'
import resolvers from './resolvers'

export let typeDefs = `
type Passport {
  _id: String
  username: String
  userId: String
  user: User
}
type User {
  _id: String
  username: String  
  passportId: String
  passport: Passport
}

type Query {
  me: Passport
  user(_id: String, username: String): User
  passport(userId: String): Passport
}

type Mutation {
  addUser(username: String!, password: String!, firstName: String!, lastName: String!): User
  loginUser(username: String!, password: String!): Passport
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })
// addMockFunctionsToSchema({ schema, mocks })

export default schema
