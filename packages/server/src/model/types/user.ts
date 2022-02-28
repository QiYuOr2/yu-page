import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyAddAssociationMixin,
  BelongsToManyAddAssociationMixin,
  Association,
} from 'sequelize';
import { Page } from './page';
import { Component } from './component';
import { Preset } from './preset';
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

  declare static associations: {
    pages: Association<Page>;
    presets: Association<Preset>;
    components: Association<Component>;
  };

  static check(target: User) {
    return !(
      isEmpty(target) ||
      isEmpty(target.account) ||
      isEmpty(target.password)
    );
  }
}
