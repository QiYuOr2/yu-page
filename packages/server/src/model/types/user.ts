import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { isEmpty } from '../../common/utils';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare account: string;
  declare password: string;
  declare avatar: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static check(target: User) {
    return !(isEmpty(target) || isEmpty(target.account) || isEmpty(target.password));
  }
}
