import { DataSources } from './datasources';
import { QueryResolvers, Resolvers, UnitResolvers, MemberResolvers } from './generated/graphql'

type Context = {
  dataSources: DataSources;
};

const Query: QueryResolvers<Context> = {
  units: (_source, _args, { dataSources }) => (
    dataSources.units.fetchUnits()
  ),
  members: (_source, _args, { dataSources }) => (
    dataSources.members.fetchMembers()
  ),
};

const Member: MemberResolvers<Context> = {
  id: member => member._id.toString(),
  fullName: member => `${member.givenNames} ${member.surname}`,
};

const Unit: UnitResolvers<Context> = {
  id: unit => unit._id.toString(),
};

const resolvers: Resolvers<Context> = {
  Member,
  Query,
  Unit,
};

export default resolvers;
