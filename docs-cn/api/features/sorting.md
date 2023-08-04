---
title: 排序
id: sorting
---

## 状态

排序状态以以下形式存储在表格中：

```tsx
export type SortDirection = 'asc' | 'desc'

export type ColumnSort = {
  id: string
  desc: boolean
}

export type SortingState = ColumnSort[]

export type SortingTableState = {
  sorting: SortingState
}
```

## 排序函数

以下排序函数内置于表格核心：

- `alphanumeric`
  - 对包含字母和数字的值进行排序，不区分大小写。速度较慢，但如果字符串中包含需要自然排序的数字，则更准确。
- `alphanumericCaseSensitive`
  - 对包含字母和数字的值进行排序，区分大小写。速度较慢，但如果字符串中包含需要自然排序的数字，则更准确。
- `text`
  - 对文本/字符串值进行排序，不区分大小写。速度较快，但如果字符串中包含需要自然排序的数字，则不够准确。
- `textCaseSensitive`
  - 对文本/字符串值进行排序，区分大小写。速度较快，但如果字符串中包含需要自然排序的数字，则不够准确。
- `datetime`
  - 按时间排序，如果值是 `Date` 对象，请使用此选项。
- `basic`
  - 使用基本的 `a > b ? -1 : b < a ? 1 : 0` 比较进行排序。这是最快的排序函数，但可能不是最准确的。

每个排序函数接收两行数据和一个列 ID，并使用列 ID 比较这两行数据，以升序返回 `-1`、`0` 或 `1`。下面是一个速查表：

| 返回值 | 升序排序 |
| ------ | --------------- |
| `-1`   | `a < b`         |
| `0`    | `a === b`       |
| `1`    | `a > b`         |

每个排序函数的类型签名如下：

```tsx
export type SortingFn<TData extends AnyData> = {
  (rowA: Row<TData>, rowB: Row<TData>, columnId: string): number
}
```

#### 使用排序函数

可以通过以下方式将排序函数用作 `columnDefinition.sortingFn` 的参数：

- 一个字符串，引用[内置排序函数](#排序函数)
- 一个字符串，引用通过 `tableOptions.sortingFns` 选项提供的自定义排序函数
- 直接提供给 `columnDefinition.sortingFn` 选项的函数

`columnDef.sortingFn` 可用的最终排序函数列表使用以下类型：

```tsx
export type SortingFnOption<TData extends AnyData> =
  | 'auto'
  | SortingFns
  | BuiltInSortingFns
  | SortingFn<TData>
```

## 列定义选项

### `sortingFn`

```tsx
sortingFn?: SortingFn | keyof SortingFns | keyof BuiltInSortingFns
```

用于此列的排序函数。

选项：

- 一个字符串，引用[内置排序函数](#排序函数)
- 一个[自定义排序函数](#排序函数)

### `sortDescFirst`

```tsx
sortDescFirst?: boolean
```

设置为 `true`，以使此列的排序切换在降序方向开始。

### `enableSorting`

```tsx
enableSorting?: boolean
```

启用/禁用此列的排序。

### `enableMultiSort`

```tsx
enableMultiSort?: boolean
```

启用/禁用此列的多重排序。

### `invertSorting`

```tsx
invertSorting?: boolean
```

反转此列的排序顺序。这对于具有倒置的最佳/最差比例的值很有用，其中较小的数字更好，例如排名（第1名、第2名、第3名）或类似高尔夫的记分。

### `sortUndefined`

```tsx
sortUndefined?: false | -1 | 1 // 默认为 false
```

- `false`
  - 未定义的值将被视为并列，并需要按照下一个列过滤器或原始索引进行排序（以适用的方式）。
- `-1`
  - 未定义的值将以较高的优先级（升序）进行排序。
- `1`
  - 未定义的值将以较低的优先级（降序）进行排序。

## 列 API

### `getAutoSortingFn`

```tsx
getAutoSortingFn: () => SortingFn<TData>
```

根据列的值自动推断并返回排序函数。

### `getAutoSortDir`

```tsx
getAutoSortDir: () => SortDirection
```

根据列的值自动推断并返回排序方向。

### `getSortingFn`

```tsx
getSortingFn: () => SortingFn<TData>
```

返回用于此列的解析排序函数。

### `getNextSortingOrder`

```tsx
getNextSortingOrder: () => SortDirection | false
```

返回下一个排序顺序。

### `getCanSort`

```tsx
getCanSort: () => boolean
```

返回此列是否可以排序。

### `getCanMultiSort`

```tsx
getCanMultiSort: () => boolean
```

返回此列是否可以进行多重排序。

### `getSortIndex`

```tsx
getSortIndex: () => number
```

返回此列在排序状态中的索引位置。

### `getIsSorted`

```tsx
getIsSorted: () => false | SortDirection
```

返回此列是否已排序。

### `clearSorting`

```tsx
clearSorting: () => void
```

从表格的排序状态中移除此列。

### `toggleSorting`

```tsx
toggleSorting: (desc?: boolean, isMulti?: boolean) => void
```

切换此列的排序状态。如果提供了 `desc`，它将强制使用该值作为排序方向。如果提供了 `isMulti`，它将对该列进行多重排序（如果已排序，则切换）。

### `getToggleSortingHandler`

```tsx
getToggleSortingHandler: () => undefined | ((event: unknown) => void)
```

返回一个函数，可用于切换此列的排序状态。这对于将点击处理程序附加到列标题很有用。

## 表格选项

### `sortingFns`

```tsx
sortingFns?: Record<string, SortingFn>
```

此选项允许您定义自定义排序函数，并可以通过其键在列的 `sortingFn` 选项中引用。示例：

```tsx
declare module '@tanstack/table-core' {
  interface SortingFns {
    myCustomSorting: SortingFn<unknown>
  }
}

const column = columnHelper.data('key', {
  sortingFn: 'myCustomSorting',
})

const table = useReactTable({
  columns: [column],
  sortingFns: {
    myCustomSorting: (rowA: any, rowB: any, columnId: any): number =>
      rowA.getValue(columnId).value < rowB.getValue(columnId).value ? 1 : -1,
  },
})
```

### `manualSorting`

```tsx
manualSorting?: boolean
```

启用表格的手动排序。如果为 `true`，则需要在将数据传递给表格之前对其进行排序。如果进行服务器端排序，这很有用。

### `onSortingChange`

```tsx
onSortingChange?: OnChangeFn<SortingState>
```

如果提供了此函数，当 `state.sorting` 更改时，将使用 `updaterFn` 调用它。这将覆盖默认的内部状态管理，因此您需要在表格之外完全或部分地保持状态更改。

### `enableSorting`

```tsx
enableSorting?: boolean
```

启用/禁用表格的排序。

### `enableSortingRemoval`

```tsx
enableSortingRemoval?: boolean
```

启用/禁用删除表格的排序功能。如果为 `true`，则更改排序顺序将循环如下：'none' -> 'desc' -> 'asc' -> 'none' -> ... 如果为 `false`，则更改排序顺序将循环如下：'none' -> 'desc' -> 'asc' -> 'desc' -> 'asc' -> ...

### `enableMultiRemove`

```tsx
enableMultiRemove?: boolean
```

启用/禁用删除多重排序的功能。

### `enableMultiSort`

```tsx
enableMultiSort?: boolean
```

启用/禁用表格的多重排序。

### `sortDescFirst`

```tsx
sortDescFirst?: boolean
```

如果为 `true`，则所有排序将默认为降序作为其第一个切换状态。

### `getSortedRowModel`

```tsx
getSortedRowModel?: (table: Table<TData>) => () => RowModel<TData>
```

此函数用于检索已排序的行模型。如果使用服务器端排序，则不需要此函数。要使用客户端排序，请将适配器导出的 `getSortedRowModel()` 传递给表格，或者自己实现。

### `maxMultiSortColCount`

```tsx
maxMultiSortColCount?: number
```

设置可以进行多重排序的最大列数。

### `isMultiSortEvent`

```tsx
isMultiSortEvent?: (e: unknown) => boolean
```

传递一个自定义函数，用于确定是否触发多重排序事件。它接收来自排序切换处理程序的事件，并应返回 `true`，如果事件应触发多重排序。

## Table API

### `setSorting`

```tsx
setSorting: (updater: Updater<SortingState>) => void
```

设置或更新 `state.sorting` 状态。

### `resetSorting`

```tsx
resetSorting: (defaultState?: boolean) => void
```

将 **sorting** 状态重置为 `initialState.sorting`，或者可以传递 `true` 强制将默认空状态重置为 `[]`。

### `getPreSortedRowModel`

```tsx
getPreSortedRowModel: () => RowModel<TData>
```

返回在应用任何排序之前的表格的行模型。

### `getSortedRowModel`

```tsx
getSortedRowModel: () => RowModel<TData>
```

返回应用排序后的表格的行模型。
