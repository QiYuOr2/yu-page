import { createRouter } from '../common/createRouter';
import { isEmpty } from '../common/utils';
import { Yu, YuStatus } from '../common/yu';
import { UserModel } from '../model';

export const UserController = createRouter('/user', (r) => {
  r.post('/register', async (req, res) => {
    if (!UserModel.check(req.body)) {
      res.json(Yu.error(YuStatus.InvalidParams));
      return;
    }
    await UserModel.create({ account: 'test', password: '123' });
    res.json(null);
  });

  r.post('/login', async (req, res) => {
    const { account, password } = req.body;

    if (isEmpty(account) || isEmpty(password)) {
      res.json(Yu.error(YuStatus.InvalidParams));
      return;
    }

    const users = await UserModel.findOne({ where: { account, password } });
    res.json(users);
  });
});
