import { Sequelize } from 'sequelize';
import { UserModel } from './user';
import dbConfig from '../common/config/db';

const sequelize = new Sequelize(dbConfig);

export const userModel = UserModel(sequelize);

export const db = sequelize;
