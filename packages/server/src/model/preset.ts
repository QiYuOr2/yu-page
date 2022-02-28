import { DataTypes, Sequelize } from 'sequelize';
import { Preset } from './types';

export const createPresetModel = (sequelize: Sequelize) => {
  return Preset.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      components: { type: DataTypes.TEXT, allowNull: false },
      isPublic: {
        field: 'is_public',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { tableName: 'presets', sequelize }
  );
};
