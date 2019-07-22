import { GraphQLResolveInfo } from "graphql";
import { MemberDbObject, UnitDbObject } from "./mongodb";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Member = {
  __typename?: "Member";
  id: Scalars["ID"];
  number: Scalars["Int"];
  fullName: Scalars["String"];
  givenNames: Scalars["String"];
  surname: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  units: Array<Unit>;
  members: Array<Member>;
};

export type Unit = {
  __typename?: "Unit";
  id: Scalars["ID"];
  code: Scalars["String"];
  name: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Unit: ResolverTypeWrapper<UnitDbObject>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Member: ResolverTypeWrapper<MemberDbObject>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Unit: UnitDbObject;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Member: MemberDbObject;
  Int: Scalars["Int"];
  Boolean: Scalars["Boolean"];
};

export type MemberResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Member"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  number?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  givenNames?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Query"]
> = {
  units?: Resolver<Array<ResolversTypes["Unit"]>, ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes["Member"]>, ParentType, ContextType>;
};

export type UnitResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Unit"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Member?: MemberResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Unit?: UnitResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
