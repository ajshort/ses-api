import { TeamDbObject } from '../generated/mongodb';
import { DataSource } from 'apollo-datasource';
import { Collection, Db } from 'mongodb';

export default class UnitsDataSource extends DataSource {
  private collection: Promise<Collection<TeamDbObject>>;

  constructor(db: Promise<Db>) {
    super();
    this.collection = db.then(db => db.collection('teams'));
  }

  fetchUnitTeams(unitCode: string) {
    return this.collection.then(collection => (
      collection.find({ unit: unitCode }).toArray()
    ));
  }
}
