import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';

export default class AuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const resolve = field.resolve || defaultFieldResolver;

    field.resolve = (source, args, context, info) => {
      if (!context.memberNumber) {
        throw new AuthenticationError('You must be logged in');
      }

      return resolve.apply(this, [source, args, context, info]);
    };
  }
}
