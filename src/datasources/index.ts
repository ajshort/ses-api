import MembersDataSource from './MembersDataSource';
import UnitsDataSource from './UnitsDataSource';
import { Db } from 'mongodb';

export {
  MembersDataSource,
  UnitsDataSource,
};

export type DataSources = {
  members: MembersDataSource;
  units: UnitsDataSource;
};

export function createDataSources(db: Promise<Db>): DataSources {
  return {
    members: new MembersDataSource(db),
    units: new UnitsDataSource(db),
  };
}
