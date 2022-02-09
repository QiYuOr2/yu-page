# YU PAGE 可视化搭建

- `@yu-page/editor` 编辑器
- `@yu-page/template` 存放页面模板/组件，用于预览页面
- `@yu-page/server` 服务端
- `@yu-page/cli` 命令行工具
- `@yu-page/form-render` schema 渲染表单

## 启动

前端项目需要依次执行`pnpm run form`, `pnpm run template`，`pnpm run editor`，`pnpm run dev`这四个命令用来编译打包`@yu-page/form-render`并且分别启动`@yu-page/template`，`@yu-page/editor`和端口代理

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
