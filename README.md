# YU PAGE 可视化搭建

- `@yu-page/editor` 编辑器
- `@yu-page/template` 存放页面模板/组件，用于预览和发布页面
- `@yu-page/server` 服务端
- `@yu-page/cli` 命令行工具
- `@yu-page/form-render` schema 渲染表单

## TODO

- [x] 展示组件列表
- [x] 拖拽添加组件
- [ ] 动态表单
  - [x] 渲染流程
  - [ ] 组件开发
  - [ ] 表单校验
- [ ] 工具组
  - [ ] 高亮跟随与实时计算高度
  - [x] 删除组件
  - [x] 上下移动
- [x] 预览页面 - 前端实现
- [ ] 保存页面
  - [ ] 前端保存
  - [x] 后端保存
- [x] 发布页面
  - [x] 二维码打开
- [ ] 构建优化

---

置后完成

- [ ] 组件搜索、分类
- [ ] CLI 开发
  - [ ] Scripts 迁移至 CLI

## 启动

**手动启动项目**

前端项目需要依次执行`pnpm run form`, `pnpm run template`，`pnpm run editor`，`pnpm run dev`这四个命令用来编译打包`@yu-page/form-render`并且分别启动`@yu-page/template`，`@yu-page/editor`和端口代理

**使用 pm2 启动**

执行`pnpm run form`后执行`pnpm run pm2:dev`即可在 pm2 中启动前端项目，在 http://localhost:3090 中可以访问

**prod 环境**

`NODE_ENV=prod pm2 start scripts/prod.js --name yu-page`

## 组件 Schema 设计

```json
{
  "name": "yu-banner",
  "description": "banner 组件",
  "snapshot": "http://xxx.png",
  "schema": {
    "type": "object",
    "properties": {
      "src": {
        "title": "图片地址",
        "type": "string",
        "format": "image"
      },
      "link": {
        "title": "跳转链接",
        "type": "string",
        "format": "url"
      }
    },
    "required": ["src"]
  },
  "data": {
    "src": "http://xxx.png"
  }
}
```
