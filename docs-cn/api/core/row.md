---
title: Row
---

注意：这是关于所有行的核心选项和API属性。其他[表格功能](../../guide/features)还提供了更多选项和API属性。

## 行API

所有行对象都具有以下属性：

### `id`

```tsx
id: string
```

通过`options.getRowId`选项解析的行的唯一标识符。默认为行的索引（如果是子行，则为相对索引）。

### `depth`

```tsx
depth: number
```

行的深度（如果是嵌套或分组的）相对于根行数组。

### `index`

```tsx
index: number
```

行在其父数组中的索引（或根数据数组中的索引）。

### `original`

```tsx
original: TData
```

提供给表格的原始行对象。

> 🧠 如果行是分组行，则原始行对象将是组中的第一个原始行。

### `parentId`

```tsx
parentId?: string
```

如果是嵌套的，则为该行的父行id。

### `getValue`

```tsx
getValue: (columnId: string) => any
```

返回给定columnId的行的值。

### `subRows`

```tsx
type subRows = Row<TData>[]
```

作为`options.getSubRows`选项返回和创建的行的子行数组。

### `getParentRow`

```tsx
type getParentRow = () => Row<TData> | undefined
```

返回行的父行（如果存在）。

### `getParentRows`

```tsx
type getParentRows = () => Row<TData>[]
```

返回行的父行，一直到根行。

### `getLeafRows`

```tsx
type getLeafRows = () => Row<TData>[]
```

返回行的叶子行，不包括任何父行。

### `originalSubRows`

```tsx
originalSubRows?: TData[]
```

由`options.getSubRows`选项返回的原始子行数组。

### `getAllCells`

```tsx
type getAllCells = () => Cell<TData>[]
```

返回行的所有[单元格](./cell.md)。
