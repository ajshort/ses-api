import { DataSources } from './datasources';
import {
  QueryResolvers,
  Resolvers,
  UnitResolvers,
  MemberResolvers,
  MutationResolvers
} from './generated/graphql';
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

type Context = {
  dataSources: DataSources;
  memberNumber?: number;
};

const Query: QueryResolvers<Context> = {
  units: (_source, _args, { dataSources }) => (
    dataSources.units.fetchUnits()
  ),
  unit: (_source, { code }, { dataSources }) => (
    dataSources.units.fetchUnit(code)
  ),
  loggedInMember: (_source, _args, { dataSources, memberNumber }) => (
    dataSources.members.fetchMember(memberNumber)
  ),
};

const Mutation: MutationResolvers<Context> = {
  login: async (_source, { memberNumber, password }, { dataSources }) => {
    const member = await dataSources.members.authenticateMember(memberNumber, password);

    if (!member) {
      throw new AuthenticationError('Invalid member number and/or password');
    }

    return jwt.sign(<object> {
      iss: '@ajshort/ses-api',
      sub: member.number,
    }, process.env.JWT_SECRET);
  },
};

const Member: MemberResolvers<Context> = {
  id: member => member._id.toString(),
  fullName: member => `${member.givenNames} ${member.surname}`,
};

const Unit: UnitResolvers<Context> = {
  id: unit => unit._id.toString(),
  members: (unit, { limit, offset }, { dataSources }) => (
    dataSources.members.fetchUnitMembers(unit.code, limit, offset)
  ),
};

const resolvers: Resolvers<Context> = {
  Member,
  Mutation,
  Query,
  Unit,
};

export default resolvers;
