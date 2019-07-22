import { createDataSources } from './datasources';
import resolvers from './resolvers';
import { ApolloServer } from 'apollo-server';
import * as fs from 'fs';
import * as path from 'path';
import { MongoClient } from 'mongodb';

const schema = path.join(__dirname, '/../src/schema.gql');
const typeDefs = fs.readFileSync(schema, 'utf-8');

const db = MongoClient
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(client => client.db(process.env.MONGODB_DATABASE));

export default new ApolloServer({
  dataSources: () => createDataSources(db),
  resolvers,
  typeDefs,
});
