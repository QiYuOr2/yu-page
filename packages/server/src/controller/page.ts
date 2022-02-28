import { createRouter } from '../common/createRouter';
import { isEmpty } from '../common/utils';
import { Yu, YuStatus } from '../common/yu';
import { PageModel } from '../model';

export const PageController = createRouter('/page', (r) => {
  r.get('/', async (req, res) => {
    const id = req.query.pageId;

    if (isEmpty(id)) {
      res.json(Yu.error(YuStatus.InvalidParams));
      return;
    }

    const page = await PageModel.findOne({ where: { id } });
    res.json(Yu.success(page));
  });

  r.post('/save', async (req, res) => {
    const page = req.body;
    if (!PageModel.check(page)) {
      res.json(Yu.error(YuStatus.InvalidParams));
      return;
    }
    await PageModel.create(page);
    res.json(Yu.success(null));
  });
});
