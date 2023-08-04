---
title: Vue 表格
---

`@tanstack/vue-table` 适配器是核心表格逻辑的包装器。它的大部分工作与以 "vue" 的方式管理状态、提供类型以及渲染单元格/表头/表尾模板相关。

## 导出

`@tanstack/vue-table` 重新导出了 `@tanstack/table-core` 的所有内容以及以下内容：

### `useVueTable`

接受一个 `options` 对象并返回一个表格。

```tsx
import { useVueTable } from '@tanstack/vue-table'

function App() {
  const table = useVueTable(options)

  // ...渲染你的表格
}
```

### `FlexRender`

用于渲染带有动态值的单元格/表头/表尾模板的 Vue 组件。

示例：

```vue
import { FlexRender } from '@tanstack/vue-table'

<template>
  <tbody>
    <tr v-for="row in table.getRowModel().rows" :key="row.id">
      <td v-for="cell in row.getVisibleCells()" :key="cell.id">
        <FlexRender
          :render="cell.column.columnDef.cell"
          :props="cell.getContext()"
        />
      </td>
    </tr>
  </tbody>
</template>
```
