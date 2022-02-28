import { DataTypes, Sequelize } from 'sequelize';
import { User } from './types';

export const createUserModel = (sequelize: Sequelize) => {
  return User.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      account: { type: DataTypes.STRING(128), allowNull: false },
      password: { type: DataTypes.STRING(128), allowNull: false },
      avatar: { type: DataTypes.STRING(128) },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { tableName: 'users', sequelize }
  );
};
