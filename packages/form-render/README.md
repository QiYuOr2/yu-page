# form-render

将 Schema 渲染成 Form 的组件

- [ ] input
- [ ] checkbox
- [ ] select
- [ ] radio

## Schema 设计

```json
{
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
    }
  },
}
```
