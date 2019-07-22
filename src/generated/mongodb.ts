export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Member = {
  __typename?: "Member";
  id: Scalars["ID"];
  number: Scalars["Int"];
  givenNames: Scalars["String"];
  surname: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
};

export type Unit = {
  __typename?: "Unit";
  id: Scalars["ID"];
  code: Scalars["String"];
  name: Scalars["String"];
};
import { ObjectID } from "mongodb";
export type UnitDbObject = {
  _id: ObjectID;
  code: string;
  name: string;
};

export type MemberDbObject = {
  _id: ObjectID;
  number: number;
  givenNames: string;
  surname: string;
  password?: Maybe<string>;
};
