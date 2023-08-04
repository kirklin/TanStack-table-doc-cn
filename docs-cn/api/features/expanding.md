---
title: 展开
id: expanding
---

## 状态

展开状态以以下形式存储在表格中：

```tsx
export type ExpandedState = true | Record<string, boolean>

export type ExpandedTableState = {
  expanded: ExpandedState
}
```

## 行 API

### `toggleExpanded`

```tsx
toggleExpanded: (expanded?: boolean) => void
```

切换行的展开状态（如果提供了`expanded`参数，则设置为该值）。

### `getIsExpanded`

```tsx
getIsExpanded: () => boolean
```

返回行是否展开。

### `getCanExpand`

```tsx
getCanExpand: () => boolean
```

返回行是否可以展开。

### `getToggleExpandedHandler`

```tsx
getToggleExpandedHandler: () => () => void
```

返回一个函数，用于切换行的展开状态。该函数可用于绑定到按钮的事件处理程序。

## 表格选项

### `manualExpanding`

```tsx
manualExpanding?: boolean
```

启用手动行展开。如果将其设置为`true`，将不会使用`getExpandedRowModel`来展开行，您需要在自己的数据模型中执行展开。如果您正在进行服务器端展开，这将非常有用。

### `onExpandedChange`

```tsx
onExpandedChange?: OnChangeFn<ExpandedState>
```

当`expanded`表格状态发生变化时调用此函数。如果提供了函数，则您将负责自行管理此状态。要将托管状态传递回表格，请使用`tableOptions.state.expanded`选项。

### `autoResetExpanded`

```tsx
autoResetExpanded?: boolean
```

启用此设置以在展开状态更改时自动重置表格的展开状态。

### `enableExpanding`

```tsx
enableExpanding?: boolean
```

启用/禁用所有行的展开。

### `getExpandedRowModel`

```tsx
getExpandedRowModel?: (table: Table<TData>) => () => RowModel<TData>
```

此函数负责返回展开的行模型。如果未提供此函数，则表格将不会展开行。您可以使用默认导出的`getExpandedRowModel`函数获取展开的行模型，或者自己实现。

### `getIsRowExpanded`

```tsx
getIsRowExpanded?: (row: Row<TData>) => boolean
```

如果提供，允许您覆盖确定行当前是否展开的默认行为。

### `getRowCanExpand`

```tsx
getRowCanExpand?: (row: Row<TData>) => boolean
```

如果提供，允许您覆盖确定行是否可以展开的默认行为。

### `paginateExpandedRows`

```tsx
paginateExpandedRows?: boolean
```

如果为`true`，展开的行将与表格的其余部分一起分页（这意味着展开的行可能跨越多个页面）。

如果为`false`，展开的行将不会被考虑在分页中（这意味着展开的行将始终呈现在其父级页面上。这也意味着将呈现比设置的页面大小更多的行数）。

## 表格 API

### `setExpanded`

```tsx
setExpanded: (updater: Updater<ExpandedState>) => void
```

通过更新函数或值更新表格的展开状态。

### `toggleAllRowsExpanded`

```tsx
toggleAllRowsExpanded: (expanded?: boolean) => void
```

切换所有行的展开状态。可选择提供一个值来设置展开状态。

### `resetExpanded`

```tsx
resetExpanded: (defaultState?: boolean) => void
```

将表格的展开状态重置为初始状态。如果提供了`defaultState`，展开状态将重置为`{}`。

### `getCanSomeRowsExpand`

```tsx
getCanSomeRowsExpand: () => boolean
```

返回是否有任何行可以展开。

### `getToggleAllRowsExpandedHandler`

```tsx
getToggleAllRowsExpandedHandler: () => (event: unknown) => void
```

返回一个处理程序，可用于切换所有行的展开状态。此处理程序适用于`input[type=checkbox]`元素。

### `getIsSomeRowsExpanded`

```tsx
getIsSomeRowsExpanded: () => boolean
```

返回是否有任何行当前处于展开状态。

### `getIsAllRowsExpanded`

```tsx
getIsAllRowsExpanded: () => boolean
```

返回是否所有行都当前处于展开状态。

### `getExpandedDepth`

```tsx
getExpandedDepth: () => number
```

返回展开行的最大深度。

### `getExpandedRowModel`

```tsx
getExpandedRowModel: () => RowModel<TData>
```

返回应用展开后的行模型。

### `getPreExpandedRowModel`

```tsx
getPreExpandedRowModel: () => RowModel<TData>
```

返回展开前的行模型。
