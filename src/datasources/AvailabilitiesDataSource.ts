import { AvailabilityDbObject } from '../generated/mongodb';
import { DataSource } from 'apollo-datasource';
import { Collection, Db } from 'mongodb';

export default class AvailabilitiesDataSource extends DataSource {
  private collection: Promise<Collection<AvailabilityDbObject>>;

  constructor(db: Promise<Db>) {
    super();
    this.collection = db.then(db => db.collection('availabilities'));
  }

  fetchAvailabilties(unitCode: string, from: Date, to: Date, memberNumber?: number) {
    const filter: any = {
      unit: unitCode,
      from: { $lte: to },
      to: { $gte: from },
    };

    if (memberNumber !== undefined) {
      filter.member = memberNumber;
    }

    return this.collection.then(collection => collection.find(filter));
  }

  setAvailability() {
  }
}
