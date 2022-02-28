import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { isEmpty } from '../../common/utils';

export class Preset extends Model<InferAttributes<Preset>, InferCreationAttributes<Preset>> {
  declare id: CreationOptional<number>;
  declare components: string;
  declare isPublic: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static check(target: Preset) {
    return !(isEmpty(target) || isEmpty(target.components));
  }
}
