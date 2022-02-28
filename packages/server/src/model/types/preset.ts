import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize';
import { User } from './user';
import { isEmpty } from '../../common/utils';

export class Preset extends Model<InferAttributes<Preset>, InferCreationAttributes<Preset>> {
  declare id: CreationOptional<number>;
  declare components: string;
  declare isPublic: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static  associations: { 
    users: Association<User>
  };

  static check(target: Preset) {
    return !(isEmpty(target) || isEmpty(target.components));
  }
}
