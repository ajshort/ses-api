import { MemberDbObject } from '../generated/mongodb';
import { DataSource } from 'apollo-datasource';
import { Collection, Db } from 'mongodb';
import { sha512crypt } from 'sha512crypt-node';

export default class UnitsDataSource extends DataSource {
  private collection: Promise<Collection<MemberDbObject>>;

  constructor(db: Promise<Db>) {
    super();
    this.collection = db.then(db => db.collection('members'));
  }

  fetchMembers() {
    return this.collection.then(collection => collection.find().sort({ number: 1 }).toArray());
  }

  fetchMember(number: number) {
    return this.collection.then(collection => collection.findOne({ number }));
  }

  async authenticateMember(memberNumber: number, password: string) {
    const member = await this.fetchMember(memberNumber);

    if (!member || !member.password) {
      return false;
    }

    // Extract the salt from the password.
    const expected = member.password;
    const salt = expected.split('$').filter(s => s.length > 0)[1];
    const crypted = sha512crypt(password, salt);

    if (crypted !== expected) {
      return false;
    }

    return member;
  }
}
