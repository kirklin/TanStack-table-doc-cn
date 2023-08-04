---
title: Solid Table
---

`@tanstack/solid-table`适配器是核心表格逻辑的包装器。它的大部分工作与以"solid"方式管理状态、提供类型以及渲染单元格/表头/表尾模板的实现相关。

## `createSolidTable`

接受一个`options`对象并返回一个表格。

```tsx
import { createSolidTable } from '@tanstack/solid-table'

function App() {
  const table = createSolidTable(options)

  // ...render your table
}
```
