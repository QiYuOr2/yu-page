import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyAddAssociationMixin,
  BelongsToManyAddAssociationMixin,
} from 'sequelize';
import { Component, Page, Preset } from '.';
import { isEmpty } from '../../common/utils';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare account: string;
  declare password: string;
  declare avatar: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare addPage: HasManyAddAssociationMixin<Page, string>;
  declare addPreset: BelongsToManyAddAssociationMixin<Preset, number>;
  declare addComponent: BelongsToManyAddAssociationMixin<Component, number>;

  static check(target: User) {
    return !(
      isEmpty(target) ||
      isEmpty(target.account) ||
      isEmpty(target.password)
    );
  }
}
