import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { isEmpty } from '../../common/utils';

export class Page extends Model<InferAttributes<Page>, InferCreationAttributes<Page>> {
  declare id: string;
  declare schema: string;
  declare name: string;
  declare description: string;
  declare thumb: string;
  declare isPublish: boolean;
  declare isPublic: boolean;
  declare isDelete: boolean;
  declare userId: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static check(target: Page) {
    return !(
      isEmpty(target) ||
      isEmpty(target.name) ||
      isEmpty(target.schema) ||
      isEmpty(target.description) ||
      isEmpty(target.isPublish)
    );
  }
}
