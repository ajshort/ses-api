import resolvers from './resolvers';
import { ApolloServer } from 'apollo-server';
import * as fs from 'fs';
import * as path from 'path';

const schema = path.join(__dirname, '/../src/schema.gql');
const typeDefs = fs.readFileSync(schema, 'utf-8');

export default new ApolloServer({
  resolvers,
  typeDefs,
});
