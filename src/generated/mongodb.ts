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
};
