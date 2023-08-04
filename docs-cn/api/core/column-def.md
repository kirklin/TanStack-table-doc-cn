---
title: ColumnDef
---

Column definitions是一个包含以下选项的普通对象：

## 选项

### `id`

```tsx
id: string
```

列的唯一标识符。

> 🧠 当：
>
> - 使用对象键访问器创建访问器列
> - 列标题定义为字符串时，列ID是可选的

### `accessorKey`

```tsx
accessorKey?: string & typeof TData
```

提取列值时要使用的行对象的键。

### `accessorFn`

```tsx
accessorFn?: (originalRow: TData, index: number) => any
```

从每行中提取列值时要使用的访问器函数。

### `columns`

```tsx
columns?: ColumnDef<TData>[]
```

要包含在组列中的子列定义。

### `header`

```tsx
header?:
  | string
  | ((props: {
      table: Table<TData>
      header: Header<TData>
      column: Column<TData>
    }) => unknown)
```

要显示的列标题。如果传递了字符串，它可以用作列ID的默认值。如果传递了函数，它将接收一个用于标题的props对象，并应返回呈现的标题值（具体类型取决于所使用的适配器）。

### `footer`

```tsx
footer?:
  | string
  | ((props: {
      table: Table<TData>
      header: Header<TData>
      column: Column<TData>
    }) => unknown)
```

要显示的列页脚。如果传递了函数，它将接收一个用于页脚的props对象，并应返回呈现的页脚值（具体类型取决于所使用的适配器）。

### `cell`

```tsx
cell?: ((props: {
  table: Table<TData>
  row: Row<TData>
  column: Column<TData>
  cell: Cell<TData>
  getValue: () => any
  renderValue: () => any
}) => unknown)
```

要为列的每一行显示的单元格。如果传递了函数，它将接收一个用于单元格的props对象，并应返回呈现的单元格值（具体类型取决于所使用的适配器）。

### `meta`

```tsx
meta?: ColumnMeta // This interface is extensible via declaration merging. See below!
```

与列关联的元数据。当列可用时，我们可以在任何地方通过`column.columnDef.meta`访问它。此类型对所有表格都是全局的，并且可以通过以下方式进行扩展：

```tsx
import '@tanstack/react-table'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    foo: string
  }
}
```
