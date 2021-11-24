# Yu-Page 页面可视化搭建

## Schema 定义

页面上一个组件的完整`Schema`

```json
{
  "id": "123456",
  "type": { "name": "common", "label": "通用组件" },
  "name": "text",
  "label": "文本",
  "icon": "alignJustify",
  "commonStyleKeys": ["width", "height"],
  "props": { "inner": { "name": "inner", "label": "内容", "val": "文本" } },
  "styles": { "width": { "name": "width", "label": "宽", "val": 40, "unit": ["px", "em"], "selectUnitIdx": 0 } }
}
```

其中`styles`属性和`id`属性是运行时计算出来的
