import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { isEmpty } from '../../common/utils';

export class Component extends Model<
  InferAttributes<Component>,
  InferCreationAttributes<Component>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare snapshot: string;
  declare schema: string;
  declare data: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static check(target: Component) {
    return !(
      isEmpty(target) ||
      isEmpty(target.name) ||
      isEmpty(target.schema) ||
      isEmpty(target.description) ||
      isEmpty(target.snapshot) ||
      isEmpty(target.data)
    );
  }
}
