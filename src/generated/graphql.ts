import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
import { MemberDbObject, UnitDbObject } from "./mongodb";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type Availability = {
  __typename?: "Availability";
  id: Scalars["ID"];
  unit: Unit;
  member: Member;
  from: Scalars["DateTime"];
  to: Scalars["DateTime"];
  storm?: Maybe<StormAvailable>;
  rescue?: Maybe<RescueAvailable>;
  vehicle?: Maybe<Scalars["String"]>;
  note?: Maybe<Scalars["String"]>;
};

export type AvailabilityInput = {
  unitCode: Scalars["String"];
  memberNumber: Scalars["Int"];
  from: Scalars["DateTime"];
  to: Scalars["DateTime"];
  storm?: Maybe<StormAvailable>;
  rescue?: Maybe<RescueAvailable>;
  vehicle?: Maybe<Scalars["String"]>;
  note?: Maybe<Scalars["String"]>;
};

export type Member = {
  __typename?: "Member";
  id: Scalars["ID"];
  number: Scalars["Int"];
  fullName: Scalars["String"];
  givenNames: Scalars["String"];
  surname: Scalars["String"];
  units: Array<Unit>;
  availabilities: Array<Availability>;
};

export type MemberAvailabilitiesArgs = {
  unitCode: Scalars["String"];
  from: Scalars["DateTime"];
  to: Scalars["DateTime"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: Scalars["String"];
  setAvailability: Array<Availability>;
};

export type MutationLoginArgs = {
  memberNumber: Scalars["Int"];
  password: Scalars["String"];
};

export type MutationSetAvailabilityArgs = {
  availability: AvailabilityInput;
};

export type Query = {
  __typename?: "Query";
  units: Array<Unit>;
  unit?: Maybe<Unit>;
  loggedInMember: Member;
};

export type QueryUnitsArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type QueryUnitArgs = {
  code: Scalars["String"];
};

export enum RescueAvailable {
  Immediate = "IMMEDIATE",
  Support = "SUPPORT",
  Unavailable = "UNAVAILABLE"
}

export enum StormAvailable {
  Available = "AVAILABLE",
  Unavailable = "UNAVAILABLE"
}

export type Unit = {
  __typename?: "Unit";
  id: Scalars["ID"];
  code: Scalars["String"];
  name: Scalars["String"];
  members: Array<Member>;
};

export type UnitMembersArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
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
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Unit: ResolverTypeWrapper<UnitDbObject>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Member: ResolverTypeWrapper<MemberDbObject>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Availability: ResolverTypeWrapper<
    Omit<Availability, "unit" | "member"> & {
      unit: ResolversTypes["Unit"];
      member: ResolversTypes["Member"];
    }
  >;
  StormAvailable: StormAvailable;
  RescueAvailable: RescueAvailable;
  Mutation: ResolverTypeWrapper<{}>;
  AvailabilityInput: AvailabilityInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Int: Scalars["Int"];
  Unit: UnitDbObject;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Member: MemberDbObject;
  DateTime: Scalars["DateTime"];
  Availability: Omit<Availability, "unit" | "member"> & {
    unit: ResolversTypes["Unit"];
    member: ResolversTypes["Member"];
  };
  StormAvailable: StormAvailable;
  RescueAvailable: RescueAvailable;
  Mutation: {};
  AvailabilityInput: AvailabilityInput;
  Boolean: Scalars["Boolean"];
};

export type AuthenticatedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AvailabilityResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Availability"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes["Unit"], ParentType, ContextType>;
  member?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
  from?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  to?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  storm?: Resolver<
    Maybe<ResolversTypes["StormAvailable"]>,
    ParentType,
    ContextType
  >;
  rescue?: Resolver<
    Maybe<ResolversTypes["RescueAvailable"]>,
    ParentType,
    ContextType
  >;
  vehicle?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type MemberResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Member"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  number?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  givenNames?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  units?: Resolver<Array<ResolversTypes["Unit"]>, ParentType, ContextType>;
  availabilities?: Resolver<
    Array<ResolversTypes["Availability"]>,
    ParentType,
    ContextType,
    MemberAvailabilitiesArgs
  >;
};

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Mutation"]
> = {
  login?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    MutationLoginArgs
  >;
  setAvailability?: Resolver<
    Array<ResolversTypes["Availability"]>,
    ParentType,
    ContextType,
    MutationSetAvailabilityArgs
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Query"]
> = {
  units?: Resolver<
    Array<ResolversTypes["Unit"]>,
    ParentType,
    ContextType,
    QueryUnitsArgs
  >;
  unit?: Resolver<
    Maybe<ResolversTypes["Unit"]>,
    ParentType,
    ContextType,
    QueryUnitArgs
  >;
  loggedInMember?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
};

export type UnitResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Unit"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  members?: Resolver<
    Array<ResolversTypes["Member"]>,
    ParentType,
    ContextType,
    UnitMembersArgs
  >;
};

export type Resolvers<ContextType = any> = {
  Availability?: AvailabilityResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Unit?: UnitResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  authenticated?: AuthenticatedDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;
