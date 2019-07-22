import UnitsDataSource from './UnitsDataSource';
import { Db } from 'mongodb';

export {
  UnitsDataSource,
};

export type DataSources = {
  units: UnitsDataSource;
};

export function createDataSources(db: Promise<Db>): DataSources {
  return {
    units: new UnitsDataSource(db),
  }
}
