import { createDataSources } from './datasources';
import AuthenticatedDirective from './directives/AuthenticatedDirective';
import resolvers from './resolvers';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import { Request } from 'express';
import * as fs from 'fs';
import jwt from 'jsonwebtoken';
import * as path from 'path';
import { MongoClient } from 'mongodb';

const schema = path.join(__dirname, '/../src/schema.gql');
const typeDefs = fs.readFileSync(schema, 'utf-8');

const db = MongoClient
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(client => client.db(process.env.MONGODB_DATABASE));

const context = (context: { req: Request }) => {
  const auth = context.req.headers['authorization'];

  if (!auth) {
    return context;
  }

  const parts = auth.split(' ');

  if (parts.length < 2 || parts[0].toLowerCase() !== 'bearer') {
    return context;
  }

  const token = parts.slice(1).join(' ');

  try {
    const payload = <{ sub: number }> jwt.verify(token, process.env.JWT_SECRET);
    const memberNumber = payload.sub;

    return { memberNumber, ...context };
  } catch (err) {
    throw new AuthenticationError('Invalid authentication token');
  }
};

export default new ApolloServer({
  context,
  dataSources: () => createDataSources(db),
  resolvers,
  schemaDirectives: { authenticated: AuthenticatedDirective },
  typeDefs,
});
