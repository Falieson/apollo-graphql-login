import express from './express'
import ConnectMongodb from './data/mongodb'

ConnectMongodb.init()
express.init()
