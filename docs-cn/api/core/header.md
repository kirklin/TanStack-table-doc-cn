---
title: 表头
---

这些是所有表头的**核心**选项和 API 属性。其他[表格功能](../../guide/features)可能还有更多选项和 API 属性。

## 表头 API

所有表头对象都具有以下属性：

### `id`

```tsx
id: string
```

表头的唯一标识符。

### `index`

```tsx
id: number
```

表头在表头组中的索引。

### `depth`

```tsx
id: number
```

表头的深度，基于零索引。

### `column`

```tsx
column: Column<TData>
```

表头关联的[Column](./column.md)对象。

### `headerGroup`

```tsx
headerGroup: HeaderGroup<TData>
```

表头关联的[HeaderGroup](./header-group.md)对象。

### `subHeaders`

```tsx
type subHeaders = Header<TData>[]
```

表头的层次子/子表头。如果表头关联的列是叶子列，则为空。

### `colSpan`

```tsx
colSpan: number
```

表头的列跨度。

### `rowSpan`

```tsx
rowSpan: number
```

表头的行跨度。

### `getLeafHeaders`

```tsx
type getLeafHeaders = () => Header<TData>[]
```

返回在此表头下层次嵌套的叶子表头。

### `isPlaceholder`

```tsx
isPlaceholder: boolean
```

一个布尔值，表示表头是否为占位符表头。

### `placeholderId`

```tsx
placeholderId?: string
```

如果表头是占位符表头，则这将是一个唯一的表头 ID，不会与表格中的任何其他表头冲突。

### `getContext`

```tsx
getContext: () => {
  table: Table<TData>
  header: Header<TData, TValue>
  column: Column<TData, TValue>
}
```

返回基于列的组件（如表头、表尾和过滤器）的渲染上下文（或属性）。使用这些属性与您的框架的 `flexRender` 实用程序一起使用，使用您选择的模板来渲染它们：

```tsx
flexRender(header.column.columnDef.header, header.getContext())
```
