import { MemberDbObject } from '../generated/mongodb';
import { DataSource } from 'apollo-datasource';
import { Collection, Db } from 'mongodb';

export default class UnitsDataSource extends DataSource {
  private collection: Promise<Collection<MemberDbObject>>;

  constructor(db: Promise<Db>) {
    super();
    this.collection = db.then(db => db.collection('members'));
  }

  fetchMembers() {
    return this.collection.then(collection => collection.find().sort({ number: 1 }).toArray());
  }
}
