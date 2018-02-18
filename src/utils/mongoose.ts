import * as mongoose from 'mongoose'
import helpers from '@falieson/js-helpers'

const handleError = helpers.errors.consoleError

const ObjectIdType = mongoose.Schema.Types.ObjectId
const ObjectId = mongoose.Types.ObjectId

mongoose.Promise = global.Promise // tslint:disable-line no-any

class MongooseModel {
  Collection: mongoose.Model<mongoose.Document>

  title = ''
  schema = new mongoose.Schema({
    _id: ObjectIdType
  })

  constructor({
      title = 'CollectionName',
      schema = {},
      plugin,
      pluginOptions = {},
    }: {
      title: string,
      schema: any, // tslint:disable-line no-any
      plugin?: any, // tslint:disable-line no-any
      pluginOptions?: any, // tslint:disable-line no-any
    } = {
      schema: {}, // tslint:disable-line no-any
      title: 'CollectionName',
    }) { // tslint:disable-line no-any
    this.title = title

    this.addToSchema(schema)
    if (plugin) {
      this.addSchemaPlugin(plugin, pluginOptions)
    }

    this.init()
  }
  
  defaultReturn = (err: any, res: any) => { // tslint:disable-line no-any
    if (err) {return handleError(err)}
    return res
  }

  defaultRecord = () => ({
    _id: new ObjectId()
  })

  init() {
    return this.Collection = mongoose.model(this.title, this.schema)
  }

  addToSchema(schema: any) { // tslint:disable-line no-any
    this.schema.add(schema)
  }

  addSchemaPlugin(plugin: any, options: any = {}) { // tslint:disable-line no-any
    this.schema.plugin(plugin, options)
  }

  findOne(args: any = {}, cb: any = this.defaultReturn) { // tslint:disable-line no-any
    return this.Collection.findOne(args, cb)
  }

  find(args: any = {}, cb: any = this.defaultReturn) { // tslint:disable-line no-any
    return this.Collection.find(args, cb)
  }

  async create(obj: any = {}) { // tslint:disable-line no-any
    const args = {
      ...this.defaultRecord(),
      ...obj
    }
    const record = new this.Collection(args)

    try {
      const savedRecord = await record.save()
      return savedRecord
    } catch (err) {
      return handleError(err)
    }
  }

  count(args: any = {}, cb: any = this.defaultReturn) { // tslint:disable-line no-any
    return this.Collection.count(args, cb)
  }
}

export default MongooseModel
