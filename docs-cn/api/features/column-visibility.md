---
title: 列可见性
id: column-visibility
---

## 状态

列可见性状态存储在表格中，使用以下结构：

```tsx
export type VisibilityState = Record<string, boolean>

export type VisibilityTableState = {
  columnVisibility: VisibilityState
}
```

## 列定义选项

### `enableHiding`

```tsx
enableHiding?: boolean
```

启用/禁用隐藏列

## 列 API

### `getCanHide`

```tsx
getCanHide: () => boolean
```

返回列是否可以隐藏

### `getIsVisible`

```tsx
getIsVisible: () => boolean
```

返回列是否可见

### `toggleVisibility`

```tsx
toggleVisibility: (value?: boolean) => void
```

切换列的可见性

### `getToggleVisibilityHandler`

```tsx
getToggleVisibilityHandler: () => (event: unknown) => void
```

返回一个函数，用于切换列的可见性。此函数可用于绑定到复选框的事件处理程序。

## 表格选项

### `onColumnVisibilityChange`

```tsx
onColumnVisibilityChange?: OnChangeFn<VisibilityState>
```

如果提供了此函数，当 `state.columnVisibility` 发生变化时，将调用 `updaterFn`。这将覆盖默认的内部状态管理，因此您需要在表格外部完全或部分地持久化状态更改。

### `enableHiding`

```tsx
enableHiding?: boolean
```

启用/禁用列的隐藏。

## 表格 API

### `getVisibleFlatColumns`

```tsx
getVisibleFlatColumns: () => Column < TData > []
```

返回一个包含可见列（包括父列）的扁平数组。

### `getVisibleLeafColumns`

```tsx
getVisibleLeafColumns: () => Column < TData > []
```

返回一个包含可见的叶子节点列的扁平数组。

### `getLeftVisibleLeafColumns`

```tsx
getLeftVisibleLeafColumns: () => Column < TData > []
```

如果有列固定，返回一个包含在表格左侧可见的叶子节点列的扁平数组。

### `getRightVisibleLeafColumns`

```tsx
getRightVisibleLeafColumns: () => Column < TData > []
```

如果有列固定，返回一个包含在表格右侧可见的叶子节点列的扁平数组。

### `getCenterVisibleLeafColumns`

```tsx
getCenterVisibleLeafColumns: () => Column < TData > []
```

如果有列固定，返回一个包含在表格未固定/中间部分可见的叶子节点列的扁平数组。

### `setColumnVisibility`

```tsx
setColumnVisibility: (updater: Updater<VisibilityState>) => void
```

通过更新函数或值更新列的可见性状态

### `resetColumnVisibility`

```tsx
resetColumnVisibility: (defaultState?: boolean) => void
```

将列的可见性状态重置为初始状态。如果提供了 `defaultState`，状态将重置为 `{}`

### `toggleAllColumnsVisible`

```tsx
toggleAllColumnsVisible: (value?: boolean) => void
```

切换所有列的可见性

### `getIsAllColumnsVisible`

```tsx
getIsAllColumnsVisible: () => boolean
```

返回是否所有列都可见

### `getIsSomeColumnsVisible`

```tsx
getIsSomeColumnsVisible: () => boolean
```

返回是否有些列可见

### `getToggleAllColumnsVisibilityHandler`

```tsx
getToggleAllColumnsVisibilityHandler: () => ((event: unknown) => void)
```

返回一个用于切换所有列可见性的处理程序，用于绑定到 `input[type=checkbox]` 元素。
