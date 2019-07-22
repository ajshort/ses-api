import { ObjectID } from "mongodb";
export type UnitDbObject = {
  _id: ObjectID;
  code: string;
  name: string;
};
