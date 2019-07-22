export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Availability = {
  __typename?: "Availability";
  id: Scalars["ID"];
  unit: Scalars["String"];
  member: Scalars["Int"];
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
  givenNames: Scalars["String"];
  surname: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
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

export type AvailabilityDbObject = {
  _id: ObjectID;
  unit: string;
  member: number;
  from: Date;
  to: Date;
  storm?: Maybe<string>;
  rescue?: Maybe<string>;
  vehicle?: Maybe<string>;
  note?: Maybe<string>;
};
