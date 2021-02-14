import { Model } from 'objection';
import db from '../config/db';

Model.knex(db);

class User extends Model {
  static get tableName() {
    return 'users';
  }
}

export default User;
