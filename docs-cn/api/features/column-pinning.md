---
title: 列固定
id: column-pinning
---

## Can-Pin

列固定的能力由以下条件决定：

- `options.enablePinning` 不设置为 `false`
- `columnDefinition.enablePinning` 不设置为 `false`

列固定状态存储在表格中，具体如下：

```tsx
export type ColumnPinningPosition = false | 'left' | 'right'

export type ColumnPinningState = {
  left?: string[]
  right?: string[]
}

export type ColumnPinningTableState = {
  columnPinning: ColumnPinningState
}
```

表格选项

### `enablePinning`

```tsx
enablePinning?: boolean
```

启用/禁用表格的所有列固定功能。

### `onColumnPinningChange`

```tsx
onColumnPinningChange?: OnChangeFn<ColumnPinningState>
```

如果提供了此函数，当 `state.columnPinning` 发生变化时，将使用 `updaterFn` 调用该函数。这将覆盖默认的内部状态管理，因此您需要在表格外部完全或部分地持久化状态更改。

列定义选项

### `enablePinning`

```tsx
enablePinning?: boolean
```

启用/禁用列的固定功能。

表格 API

### `setColumnPinning`

```tsx
setColumnPinning: (updater: Updater<ColumnPinningState>) => void
```

设置或更新 `state.columnPinning` 状态。

### `resetColumnPinning`

```tsx
resetColumnPinning: (defaultState?: boolean) => void
```

将 **columnPinning** 状态重置为 `initialState.columnPinning`，或者可以传递 `true` 强制将其重置为空白状态 `{ left: [], right: [], }`。

### `getIsSomeColumnsPinned`

```tsx
getIsSomeColumnsPinned: (position?: ColumnPinningPosition) => boolean
```

返回是否有任何列被固定。可选择指定仅检查左侧或右侧位置的固定列。

_注意：不考虑列的可见性_

### `getLeftHeaderGroups`

```tsx
getLeftHeaderGroups: () => HeaderGroup < TData > []
```

返回表格的左侧固定表头组。

### `getCenterHeaderGroups`

```tsx
getCenterHeaderGroups: () => HeaderGroup < TData > []
```

返回表格的未固定/中间表头组。

### `getRightHeaderGroups`

```tsx
getRightHeaderGroups: () => HeaderGroup < TData > []
```

返回表格的右侧固定表头组。

### `getLeftFooterGroups`

```tsx
getLeftFooterGroups: () => HeaderGroup < TData > []
```

返回表格的左侧固定表尾组。

### `getCenterFooterGroups`

```tsx
getCenterFooterGroups: () => HeaderGroup < TData > []
```

返回表格的未固定/中间表尾组。

### `getRightFooterGroups`

```tsx
getRightFooterGroups: () => HeaderGroup < TData > []
```

返回表格的右侧固定表尾组。

### `getLeftFlatHeaders`

```tsx
getLeftFlatHeaders: () => Header < TData > []
```

返回表格的左侧固定表头的扁平数组，包括父表头。

### `getCenterFlatHeaders`

```tsx
getCenterFlatHeaders: () => Header < TData > []
```

返回表格的未固定/中间表头的扁平数组，包括父表头。

### `getRightFlatHeaders`

```tsx
getRightFlatHeaders: () => Header < TData > []
```

返回表格的右侧固定表头的扁平数组，包括父表头。

### `getLeftLeafHeaders`

```tsx
getLeftLeafHeaders: () => Header < TData > []
```

返回表格的左侧固定表头的叶节点扁平数组。

### `getCenterLeafHeaders`

```tsx
getCenterLeafHeaders: () => Header < TData > []
```

返回表格的未固定/中间表头的叶节点扁平数组。

### `getRightLeafHeaders`

```tsx
getRightLeafHeaders: () => Header < TData > []
```

返回表格的右侧固定表头的叶节点扁平数组。

### `getLeftLeafColumns`

```tsx
getLeftLeafColumns: () => Column < TData > []
```

返回所有左侧固定的叶节点列。

### `getRightLeafColumns`

```tsx
getRightLeafColumns: () => Column < TData > []
```

返回所有右侧固定的叶节点列。

### `getCenterLeafColumns`

```tsx
getCenterLeafColumns: () => Column < TData > []
```

返回所有中间固定（未固定）的叶节点列。

列 API

### `getCanPin`

```tsx
getCanPin: () => boolean
```

返回列是否可以固定。

### `getPinnedIndex`

```tsx
getPinnedIndex: () => number
```

返回列在固定列组中的数值固定索引。

### `getIsPinned`

```tsx
getIsPinned: () => ColumnPinningPosition
```

返回列的固定位置（`'left'`、`'right'` 或 `false`）。

### `pin`

```tsx
pin: (position: ColumnPinningPosition) => void
```

将列固定到 `'left'` 或 `'right'`，或者如果传递 `false`，则将列取消固定到中间。

行 API

### `getLeftVisibleCells`

```tsx
getLeftVisibleCells: () => Cell < TData > []
```

返回行中所有左侧固定的叶节点单元格。

### `getRightVisibleCells`

```tsx
getRightVisibleCells: () => Cell < TData > []
```

返回行中所有右侧固定的叶节点单元格。

### `getCenterVisibleCells`

```tsx
getCenterVisibleCells: () => Cell < TData > []
```

返回行中所有中间固定（未固定）的叶节点单元格。
