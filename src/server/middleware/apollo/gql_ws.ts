import { Server } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { PubSub } from "graphql-subscriptions"
import { execute, subscribe, GraphQLSchema } from 'graphql';

import { GRAPHQL_WS } from '../../config'

export const pubsub = new PubSub()

export default function (schema: GraphQLSchema, ws: Server) {
  return new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: GRAPHQL_WS,
  });
}

