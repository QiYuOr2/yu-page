import { Sequelize } from 'sequelize';
import dbConfig from '../common/config/db';
import { createUserModel } from './user';
import { createPageModel } from './page';
import { createPresetModel } from './preset';
import { createComponentModel } from './component';

const sequelize = new Sequelize(dbConfig);

const UserModel = createUserModel(sequelize);
const PageModel = createPageModel(sequelize);
const PresetModel = createPresetModel(sequelize);
const ComponentModel = createComponentModel(sequelize);

//#region 关系
// 一个页面属于一个用户
UserModel.hasMany(PageModel, { sourceKey: 'id', foreignKey: 'userId', as: 'pages' });
// 用户与预设
PresetModel.belongsToMany(UserModel, { through: 'user_presets' });
UserModel.belongsToMany(PresetModel, { through: 'user_presets' });
// 用户与组件
ComponentModel.belongsToMany(UserModel, { through: 'user_components' });
UserModel.belongsToMany(ComponentModel, { through: 'user_components' });
//#endregion

export const db = sequelize;
export { UserModel, PageModel, PresetModel, ComponentModel };
