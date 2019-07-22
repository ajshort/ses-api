import { UnitDbObject } from '../generated/mongodb';
import { DataSource } from 'apollo-datasource';
import { Collection, Db } from 'mongodb';

export default class UnitsDataSource extends DataSource {
  private collection: Promise<Collection<UnitDbObject>>;

  constructor(db: Promise<Db>) {
    super();
    this.collection = db.then(db => db.collection('units'));
  }

  fetchUnits() {
    return this.collection.then(collection => collection.find().sort({ code: 1 }).toArray());
  }
}
