import { createRouter } from '../common/createRouter';
import { userModel } from '../model';

export const MockController = createRouter('/mock', (r) => {
  r.get('/', async (req, res) => {
    await userModel.create({ name: 'test' });
    const users = await userModel.findAll();
    res.json(users);
  });
});
