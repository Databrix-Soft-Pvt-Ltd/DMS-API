import { ApolloServer } from '@apollo/server';
import { applyMiddleware } from 'graphql-middleware';
import permissions from '../permissions';
import schema from './schema';

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
});

export default apolloServer;
