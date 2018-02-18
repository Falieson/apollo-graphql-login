import UserModel from './users/model'
import PassportModel from './passport/model'

export const Models = {
  User: UserModel,
  Passport: PassportModel,
}

export {default as schema} from './schema'
