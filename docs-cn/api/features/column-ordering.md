---
title: 列排序
id: column-ordering
---

## 状态

列排序状态以以下形式存储在表格中：

```tsx
export type ColumnOrderTableState = {
  columnOrder: ColumnOrderState
}

export type ColumnOrderState = string[]
```

## 表格选项

### `onColumnOrderChange`

```tsx
onColumnOrderChange?: OnChangeFn<ColumnOrderState>
```

如果提供了此函数，当 `state.columnOrder` 发生变化时，将使用 `updaterFn` 调用它。这将覆盖默认的内部状态管理，因此您需要在表格外部完全或部分地持久化状态更改。

## 表格 API

### `setColumnOrder`

```tsx
setColumnOrder: (updater: Updater<ColumnOrderState>) => void
```

设置或更新 `state.columnOrder` 状态。

### `resetColumnOrder`

```tsx
resetColumnOrder: (defaultState?: boolean) => void
```

将 **columnOrder** 状态重置为 `initialState.columnOrder`，或者可以传递 `true` 强制将其重置为空白状态 `[]`。
