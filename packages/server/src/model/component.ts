import { DataTypes, Sequelize } from 'sequelize';
import { Component } from './types';

export const createComponentModel = (sequelize: Sequelize) => {
  return Component.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(128), allowNull: false },
      schema: { type: DataTypes.TEXT, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      snapshot: { type: DataTypes.STRING(256), allowNull: false },
      data: { type: DataTypes.TEXT, allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { tableName: 'components', sequelize }
  );
};
