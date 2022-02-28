import { createRouter } from '../common/createRouter';
import { UserModel } from '../model';

export const UserController = createRouter('/user', (r) => {
  r.get('/register', async (req, res) => {
    await UserModel.create({ account: 'test', password: '123' });
    const users = await UserModel.findAll();
    res.json(users);
  });

  r.post('/login', async (req, res) => {
    const { account, password } = req.body;
    const users = await UserModel.findOne({ where: { account, password } });
    res.json(users);
  });
});
