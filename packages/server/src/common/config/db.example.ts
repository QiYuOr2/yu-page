// 修改配置信息后，去掉文件名中.example可以正常使用
import { Options } from 'sequelize';

const dbConfig: Options = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'xxxx',
  password: 'xxxx',
  database: 'xxxx',
};

export default dbConfig;
