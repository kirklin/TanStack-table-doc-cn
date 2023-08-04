---
title: 单元格
---

这些是所有单元格的**核心**选项和API属性。其他[表格功能](../../guide/features)还提供了更多选项和API属性。

## 单元格API

所有单元格对象都具有以下属性：

### `id`

```tsx
id: string
```

整个表格中单元格的唯一ID。

### `getValue`

```tsx
getValue: () => any
```

通过关联列的访问器键或访问器函数，返回单元格的值。

### `row`

```tsx
row: Row<TData>
```

与单元格关联的行对象。

### `column`

```tsx
column: Column<TData>
```

与单元格关联的列对象。

### `getContext`

```tsx
getContext: () => {
  table: Table<TData>
  column: Column<TData, TValue>
  row: Row<TData>
  cell: Cell<TData, TValue>
  getValue: <TTValue = TValue>() => TTValue
  renderValue: <TTValue = TValue>() => TTValue | null
}
```

返回基于单元格的组件（如单元格和聚合单元格）的渲染上下文（或属性）。使用这些属性与您的框架的`flexRender`实用程序一起使用，使用您选择的模板来渲染它们：

```tsx
flexRender(cell.column.columnDef.cell, cell.getContext())
```
