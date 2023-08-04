---
title: React 表格
---

`@tanstack/react-table` 适配器是核心表格逻辑的包装器。它的大部分工作与以 "React" 的方式管理状态、提供类型以及渲染单元格/表头/表尾模板相关。

## `useReactTable`

接受一个 `options` 对象，并返回一个表格。

```tsx
import { useReactTable } from '@tanstack/react-table'

function App() {
  const table = useReactTable(options)

  // ...渲染你的表格
}
```
