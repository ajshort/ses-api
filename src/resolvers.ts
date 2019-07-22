import { DataSources } from './datasources';
import { QueryResolvers, Resolvers, UnitResolvers } from './generated/graphql'

type Context = {
  dataSources: DataSources;
};

const Query: QueryResolvers<Context> = {
  units: (_source, _args, { dataSources }) => (
    dataSources.units.fetchUnits()
  ),
};

const Unit: UnitResolvers<Context> = {
  id: unit => unit._id.toString(),
};

const resolvers: Resolvers<Context> = {
  Query,
  Unit,
};

export default resolvers;
