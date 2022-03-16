import { DataTypes, Sequelize } from 'sequelize';
import { Page } from './types';

export const createPageModel = (sequelize: Sequelize) => {
  return Page.init(
    {
      id: { type: DataTypes.STRING(64), autoIncrement: false, primaryKey: true },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      name: { type: DataTypes.STRING(128), allowNull: false },
      schema: { type: DataTypes.TEXT, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      thumb: { type: DataTypes.STRING(128), allowNull: true },
      isPublic: {
        field: 'is_public',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isPublish: { field: 'is_publish', type: DataTypes.BOOLEAN, allowNull: false },
      isDelete: { field: 'is_delete', type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { tableName: 'pages', sequelize }
  );
};
