import MembersDataSource from './MembersDataSource';
import TeamsDataSource from './TeamsDataSource';
import UnitsDataSource from './UnitsDataSource';
import { Db } from 'mongodb';

export {
  MembersDataSource,
  TeamsDataSource,
  UnitsDataSource,
};

export type DataSources = {
  members: MembersDataSource;
  teams: TeamsDataSource;
  units: UnitsDataSource;
};

export function createDataSources(db: Promise<Db>): DataSources {
  return {
    members: new MembersDataSource(db),
    teams: new TeamsDataSource(db),
    units: new UnitsDataSource(db),
  };
}
