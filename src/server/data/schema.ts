import { makeExecutableSchema } from 'graphql-tools' // addMockFunctionsToSchema,
// import mocks from './mocks'
import resolvers from './resolvers'

export let typeDefs = `
type User {
  _id: String
  username: String  
  passportId: String
  passport: Passport
  profileId: String
  profile: Profile
}

type Passport {
  _id: String
  username: String
  userId: String
  user: User
}

type Profile {
  _id: String
  firstName: String
  lastName: String 
  emails: [Email]
  userId: String
  user: User
}
type Email {
  address: String
  verified: Boolean
}

type Mutation {
  addUser(email: String!, username: String!, password: String!): User
  loginUser(username: String!, password: String!): Passport
  logoutUser: Boolean
}

type Query {
  me: Passport
  user(_id: String, username: String): User
  profile(userId: String): Profile
  passport(userId: String): Passport
}

type Subscription {
  me: Passport,
  user(_id: String, username: String): User  
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })
// addMockFunctionsToSchema({ schema, mocks })

export default schema
