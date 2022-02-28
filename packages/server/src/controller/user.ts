import { createRouter } from '../common/createRouter';
import { isEmpty } from '../common/utils';
import { Yu, YuStatus } from '../common/yu';
import { UserModel } from '../model';

export const UserController = createRouter('/user', (r) => {
  /**
   * 注册
   */
  r.post('/register', async (req, res) => {
    if (!UserModel.check(req.body)) {
      res.json(Yu.error(YuStatus.InvalidParams));
      return;
    }
    await UserModel.create({ account: 'test', password: '123' });
    res.json(null);
  });

  /**
   * 登录
   */
  r.post('/login', async (req, res) => {
    const { account, password } = req.body;

    if (isEmpty(account) || isEmpty(password)) {
      res.json(Yu.error(YuStatus.InvalidParams));
      return;
    }

    const users = await UserModel.findOne({ where: { account, password } });
    res.json(Yu.success(null /* token, id */));
  });

  /**
   * 更新个人信息
   */
  r.post('/update', async (req, res) => {
    let { id, account, password } = req.body;
    id = Number(id);

    if (isNaN(id) || isEmpty(account) || isEmpty(password)) {
      res.json(Yu.error(YuStatus.InvalidParams));
      return;
    }

    await UserModel.update({ account, password }, { where: { id } });
    res.json(Yu.success(null));
  });
});
