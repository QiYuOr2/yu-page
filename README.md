# YU PAGE 可视化搭建

使用 monorepo 管理项目

## 启动

前端项目需要依次执行`pnpm run template`，`pnpm run editor`，`pnpm run dev`这三个命令

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
