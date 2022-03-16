import { createRouter } from '../common/createRouter';
import { catchAsyncErr, isEmpty } from '../common/utils';
import { Yu, YuStatus } from '../common/yu';
import { PageModel, UserModel } from '../model';

export const PageController = createRouter('/page', (r) => {
  r.get(
    '/',
    catchAsyncErr(async (req, res) => {
      const id = req.query.pageId;

      if (isEmpty(id)) {
        res.json(Yu.error(YuStatus.InvalidParams));
        return;
      }

      const page = await PageModel.findOne({ where: { id } });

      if (page.isDelete) {
        res.json(Yu.error(YuStatus.NotExist, '页面已被删除'));
        return;
      }
      res.json(Yu.success(page));
    })
  ).comment('根据ID获取页面');

  r.get(
    '/list',
    catchAsyncErr(async (req, res) => {
      const userId = Number(req.query.userId);

      if (isEmpty(userId) || isNaN(userId)) {
        res.json(Yu.error(YuStatus.InvalidParams));
        return;
      }

      const pages = await PageModel.findAll({ where: { userId, isDelete: false } });
      res.json(Yu.success(pages));
    })
  ).comment('获取某人页面列表');

  r.post(
    '/create',
    catchAsyncErr(async (req, res) => {
      const page = req.body;
      const userId = req.body.userId;

      if (!PageModel.check(page)) {
        res.json(Yu.error(YuStatus.InvalidParams));
        return;
      }
      const user = await UserModel.findByPk(userId);

      if (!user.id) {
        res.json(Yu.error(YuStatus.NotExist, '用户不存在'));
        return;
      }

      // 生成page id
      const createId = () => (Math.floor(Math.random() * 10 + 1) * Date.now()).toString(36);

      const createdPage = await PageModel.create({ id: createId(), ...page });
      await user.addPage(createdPage.id);

      res.json(Yu.success({ id: createdPage.id }));
    })
  ).comment('创建页面');

  r.post(
    '/update.config',
    catchAsyncErr(async (req, res) => {
      const { id, schema, name, description } = req.body;
      await PageModel.update({ schema, name, description }, { where: { id } });
      res.json(Yu.success(null));
    })
  ).comment('更新页面信息');

  r.post(
    '/update.publish',
    catchAsyncErr(async (req, res) => {
      const { id, isPublish } = req.body;

      if (typeof isPublish === 'boolean') {
        res.json(Yu.error(YuStatus.InvalidParams));
        return;
      }

      await PageModel.update({ isPublish }, { where: { id } });
      res.json(Yu.success(null));
    })
  ).comment('更新页面发布状态');

  r.post(
    '/update.public',
    catchAsyncErr(async (req, res) => {
      const { id, isPublic } = req.body;

      if (typeof isPublic !== 'boolean') {
        res.json(Yu.error(YuStatus.InvalidParams));
        return;
      }

      await PageModel.update({ isPublic }, { where: { id } });
      res.json(Yu.success(null));
    })
  ).comment('更新页面开放状态');

  r.post(
    '/delete',
    catchAsyncErr(async (req, res) => {
      const id = req.body.pageId;

      if (!id) {
        res.json(Yu.error(YuStatus.InvalidParams));
        return;
      }

      await PageModel.update({ isDelete: true }, { where: { id } });
      res.json(Yu.success(null));
    })
  ).comment('删除页面');
});
