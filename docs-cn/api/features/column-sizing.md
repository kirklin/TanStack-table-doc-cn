---
title: 列尺寸
id: column-sizing
---

## 状态

表格上的列大小状态以以下形式存储：

```tsx
export type ColumnSizingTableState = {
  columnSizing: ColumnSizing
  columnSizingInfo: ColumnSizingInfoState
}

export type ColumnSizing = Record<string, number>

export type ColumnSizingInfoState = {
  startOffset: null | number
  startSize: null | number
  deltaOffset: null | number
  deltaPercentage: null | number
  isResizingColumn: false | string
  columnSizingStart: [string, number][]
}
```

## 列定义选项

### `enableResizing`

```tsx
enableResizing?: boolean
```

启用或禁用列的调整大小功能。

### `size`

```tsx
size?: number
```

列的期望大小。

### `minSize`

```tsx
minSize?: number
```

列允许的最小大小。

### `maxSize`

```tsx
maxSize?: number
```

列允许的最大大小。

## 列 API

## 表格选项

### `getSize`

```tsx
getSize: () => number
```

返回列的当前大小。

### `getStart`

```tsx
getStart: (position?: ColumnPinningPosition) => number
```

返回列沿行轴（通常是标准表格的 x 轴）的偏移量测量。

### `getCanResize`

```tsx
getCanResize: () => boolean
```

如果列可以调整大小，则返回 `true`。

### `getIsResizing`

```tsx
getIsResizing: () => boolean
```

如果列当前正在调整大小，则返回 `true`。

### `resetSize`

```tsx
resetSize: () => void
```

将列的大小重置为初始大小。

## 头部 API

### `getSize`

```tsx
getSize: () => number
```

返回头部的大小，通过对其所有属于它的叶子列的大小求和计算得出。

### `getStart`

```tsx
getStart: (position?: ColumnPinningPosition) => number
```

返回头部沿行轴（通常是标准表格的 x 轴）的偏移量测量。这实际上是所有前面头部的偏移量测量之和。

### `getResizeHandler`

```tsx
getResizeHandler: () => (event: unknown) => void
```

返回一个事件处理函数，用于调整头部的大小。它可以用作：

- `onMouseDown` 处理程序
- `onTouchStart` 处理程序

拖动和释放事件将自动处理。

## 表格 API 选项

### `enableColumnResizing`

```tsx
enableColumnResizing?: boolean
```

启用/禁用\*所有列\*\*的列调整大小。

### `columnResizeMode`

```tsx
columnResizeMode?: 'onChange' | 'onEnd'
```

确定何时更新 columnSizing 状态。`onChange` 在用户拖动调整大小手柄时更新状态。`onEnd` 在用户释放调整大小手柄时更新状态。

### `onColumnSizingChange`

```tsx
onColumnSizingChange?: OnChangeFn<ColumnSizingState>
```

当 columnSizing 状态发生变化时，将调用此可选函数。如果提供了此函数，您将负责自行维护其状态。您可以通过 `state.columnSizing` 表格选项将此状态传递回表格。

### `onColumnSizingInfoChange`

```tsx
onColumnSizingInfoChange?: OnChangeFn<ColumnSizingInfoState>
```

当 columnSizingInfo 状态发生变化时，将调用此可选函数。如果提供了此函数，您将负责自行维护其状态。您可以通过 `state.columnSizingInfo` 表格选项将此状态传递回表格。

## 表格 API

### `setColumnSizing`

```tsx
setColumnSizing: (updater: Updater<ColumnSizingState>) => void
```

使用更新函数或值设置列大小状态。如果表格选项中传递了 `onColumnSizingChange` 函数，这将触发底层的 `onColumnSizingChange` 函数，否则状态将由表格自动管理。

### `setColumnSizingInfo`

```tsx
setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => void
```

使用更新函数或值设置列大小信息状态。如果表格选项中传递了 `onColumnSizingInfoChange` 函数，这将触发底层的 `onColumnSizingInfoChange` 函数，否则状态将由表格自动管理。

### `resetColumnSizing`

```tsx
resetColumnSizing: (defaultState?: boolean) => void
```

将列大小重置为初始状态。如果 `defaultState` 为 `true`，将使用表格的默认状态，而不是提供给表格的初始值。

### `resetHeaderSizeInfo`

```tsx
resetHeaderSizeInfo: (defaultState?: boolean) => void
```

将列大小信息重置为初始状态。如果 `defaultState` 为 `true`，将使用表格的默认状态，而不是提供给表格的初始值。

### `getTotalSize`

```tsx
getTotalSize: () => number
```

通过计算所有叶子列的大小之和，返回表格的总大小。

### `getLeftTotalSize`

```tsx
getLeftTotalSize: () => number
```

如果有固定列，通过计算所有左侧叶子列的大小之和，返回表格左侧部分的总大小。

### `getCenterTotalSize`

```tsx
getCenterTotalSize: () => number
```

如果有固定列，通过计算所有未固定/中心叶子列的大小之和，返回表格中心部分的总大小。

### `getRightTotalSize`

```tsx
getRightTotalSize: () => number
```

如果有固定列，通过计算所有右侧叶子列的大小之和，返回表格右侧部分的总大小。
