---
title: 过滤器
id: filters
---

## Can-Filter（可过滤）

列是否可以进行**列**过滤取决于以下条件：

- 列是使用有效的`accessorKey`/`accessorFn`定义的。
- `column.enableColumnFilter`不设置为`false`。
- `options.enableColumnFilters`不设置为`false`。
- `options.enableFilters`不设置为`false`。

列是否可以进行**全局**过滤取决于以下条件：

- 列是使用有效的`accessorKey`/`accessorFn`定义的。
- 如果提供了`options.getColumnCanGlobalFilter`，则对于给定的列，它返回`true`。如果未提供，则假定如果第一行的值是`string`或`number`类型，则列可进行全局过滤。
- `column.enableColumnFilter`不设置为`false`。
- `options.enableColumnFilters`不设置为`false`。
- `options.enableFilters`不设置为`false`。

## State（状态）

过滤状态使用以下结构存储在表格中：

```tsx
export type FiltersTableState = {
  columnFilters: ColumnFiltersState
  globalFilter: any
}

export type ColumnFiltersState = ColumnFilter[]

export type ColumnFilter = {
  id: string
  value: unknown
}
```

## Filter Functions（过滤函数）

以下过滤函数内置于表格核心：

- `includesString`
  - 不区分大小写的字符串包含
- `includesStringSensitive`
  - 区分大小写的字符串包含
- `equalsString`
  - 不区分大小写的字符串相等
- `equalsStringSensitive`
  - 区分大小写的字符串相等
- `arrIncludes`
  - 数组中包含项
- `arrIncludesAll`
  - 数组中包含所有项
- `arrIncludesSome`
  - 数组中包含一些项
- `equals`
  - 对象/引用相等 `Object.is`/`===`
- `weakEquals`
  - 弱对象/引用相等 `==`
- `inNumberRange`
  - 数字范围包含

每个过滤函数接收以下参数：

- 要过滤的行
- 用于检索行值的列ID
- 过滤值

如果应该包含过滤行，则返回`true`，如果应该删除过滤行，则返回`false`。

以下是每个过滤函数的类型签名：

```tsx
export type FilterFn<TData extends AnyData> = {
  (
    row: Row<TData>,
    columnId: string,
    filterValue: any,
    addMeta: (meta: any) => void
  ): boolean
  resolveFilterValue?: TransformFilterValueFn<TData>
  autoRemove?: ColumnFilterAutoRemoveTestFn<TData>
  addMeta?: (meta?: any) => void
}

export type TransformFilterValueFn<TData extends AnyData> = (
  value: any,
  column?: Column<TData>
) => unknown

export type ColumnFilterAutoRemoveTestFn<TData extends AnyData> = (
  value: any,
  column?: Column<TData>
) => boolean

export type CustomFilterFns<TData extends AnyData> = Record<
  string,
  FilterFn<TData>
>
```

### `filterFn.resolveFilterValue`

在任何给定的`filterFn`上的可选的“挂起”方法，允许过滤函数在将过滤值传递给过滤函数之前对其进行转换/清理/格式化。

### `filterFn.autoRemove`

在任何给定的`filterFn`上的可选的“挂起”方法，传递一个过滤值，并且如果过滤值应该从过滤状态中删除，则返回`true`。例如，某些布尔类型的过滤器可能希望在过滤值设置为`false`时从表格状态中删除过滤值。

#### 使用过滤函数

可以通过将以下内容传递给`columnDefinition.filterFn`或`options.globalFilterFn`来使用/引用/定义过滤函数：

- 引用内置过滤函数的`string`
- 直接提供给`columnDefinition.filterFn`选项的函数

`columnDef.filterFn`和`tableOptions.globalFilterFn`选项的最终过滤函数列表使用以下类型：

```tsx
export type FilterFnOption<TData extends AnyData> =
  | 'auto'
  | BuiltInFilterFn
  | FilterFn<TData>
```

#### 过滤元数据

过滤数据通常会暴露有关数据的其他信息，这些信息可以用于帮助对相同数据进行其他未来操作。一个很好的例子是像[`match-sorter`](https://github.com/kentcdodds/match-sorter)这样的排名系统，它同时对数据进行排名、过滤和排序。虽然像`match-sorter`这样的工具在单维度的过滤+排序任务中非常有意义，但构建表格的解耦过滤/排序架构使得它们非常难以使用和缓慢。

为了使排名/过滤/排序系统与表格一起工作，`filterFn`可以选择使用**过滤元数据**值标记结果，以便稍后可以使用它们对数据进行排序/分组等操作。这是通过调用提供给自定义`filterFn`的`addMeta`函数来完成的。

以下是使用我们自己的`match-sorter-utils`包（`match-sorter`的实用程序分支）对数据进行排名、过滤和排序的示例：

```tsx
import { sortingFns } from '@tanstack/react-table'

import { rankItem, compareItems } from '@tanstack/match-sorter-utils'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // 对项进行排名
  const itemRank = rankItem(row.getValue(columnId), value)

  // 存储排名信息
  addMeta(itemRank)

  // 返回是否应该过滤行
  return itemRank.passed
}

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0

  // 仅在列具有排名信息时才按排名排序
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]!,
      rowB.columnFiltersMeta[columnId]!
    )
  }

  // 提供一个字母数字的回退，用于当项的排名相等时
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
```

## Column Def Options（列定义选项）

### `filterFn`

```tsx
filterFn?: FilterFn | keyof FilterFns | keyof BuiltInFilterFns
```

用于此列的过滤函数。

选项：

- 引用[内置过滤函数](#filter-functions)的`string`
- [自定义过滤函数](#filter-functions)

### `enableColumnFilter`

```tsx
enableColumnFilter?: boolean
```

启用/禁用此列的**列**过滤。

### `enableGlobalFilter`

```tsx
enableGlobalFilter?: boolean
```

启用/禁用此列的**全局**过滤。

## Column API（列 API）

### `getCanFilter`

```tsx
getCanFilter: () => boolean
```

返回列是否可以进行**列**过滤。

### `getCanGlobalFilter`

```tsx
getCanGlobalFilter: () => boolean
```

返回列是否可以进行**全局**过滤。

### `getFilterIndex`

```tsx
getFilterIndex: () => number
```

返回列过滤器在表格的`state.columnFilters`数组中的索引（包括`-1`）。

### `getIsFiltered`

```tsx
getIsFiltered: () => boolean
```

返回列当前是否已过滤。

### `getFilterValue`

```tsx
getFilterValue: () => unknown
```

返回列的当前过滤值。

### `setFilterValue`

```tsx
setFilterValue: (updater: Updater<any>) => void
```

设置列的当前过滤值。可以传递值或更新函数以进行对现有值的不可变安全操作。

### `getAutoFilterFn`

```tsx
getAutoFilterFn: (columnId: string) => FilterFn<TData> | undefined
```

返回基于列的第一个已知值自动计算的过滤函数。

### `getFilterFn`

```tsx
getFilterFn: (columnId: string) => FilterFn<TData> | undefined
```

返回过滤函数（根据配置是用户定义的还是自动的）。

### `getFacetedRowModel`

```tsx
type getFacetedRowModel = () => RowModel<TData>
```

> ⚠️ 需要将有效的`getFacetedRowModel`函数传递给`options.facetedRowModel`。通过导出的`getFacetedRowModel`函数提供了一个默认实现。

返回应用了所有其他列过滤器但不包括自身过滤器的行模型。用于显示分面结果计数。

### `getFacetedUniqueValues`

```tsx
getFacetedUniqueValues: () => Map<any, number>
```

> ⚠️ 需要将有效的`getFacetedUniqueValues`函数传递给`options.getFacetedUniqueValues`。通过导出的`getFacetedUniqueValues`函数提供了一个默认实现。

**计算并返回**从`column.getFacetedRowModel`派生的唯一值及其出现次数的`Map`。用于显示分面结果值。

### `getFacetedMinMaxValues`

```tsx
getFacetedMinMaxValues: () => Map<any, number>
```

> ⚠️ 需要将有效的`getFacetedMinMaxValues`函数传递给`options.getFacetedMinMaxValues`。通过导出的`getFacetedMinMaxValues`函数提供了一个默认实现。

**计算并返回**从`column.getFacetedRowModel`派生的最小值和最大值的元组。用于显示分面结果值。

## Row API（行 API）

### `columnFilters`

```tsx
columnFilters: Record<string, boolean>
```

行的列过滤器映射。此对象通过其列ID跟踪行是否通过/未通过特定过滤器。

### `columnFiltersMeta`

```tsx
columnFiltersMeta: Record<string, any>
```

行的列过滤器元数据映射。此对象跟踪在过滤过程中可选地为行提供的任何过滤元数据。

## Table Options（表格选项）

### `filterFns`

```tsx
filterFns?: Record<string, FilterFn>
```

此选项允许您定义自定义过滤函数，可以通过其键在列的`filterFn`选项中引用。
示例：

```tsx
declare module '@tanstack/table-core' {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>
  }
}

const column = columnHelper.data('key', {
  filterFn: 'myCustomFilter',
})

const table = useReactTable({
  columns: [column],
  filterFns: {
    myCustomFilter: (rows, columnIds, filterValue) => {
      // 返回过滤后的行
    },
  },
})
```

### `filterFromLeafRows`

```tsx
filterFromLeafRows?: boolean
```

默认情况下，从父行向下进行过滤（因此，如果父行被过滤掉，其所有子行也将被过滤掉）。将此选项设置为`true`将导致从叶行向上进行过滤（这意味着只要其子行或孙行之一被包含在内，父行将被包含在内）。

### `maxLeafRowFilterDepth`

```tsx
maxLeafRowFilterDepth?: number
```

默认情况下，对所有行进行过滤（最大深度为100），无论它们是根级父行还是父行的子叶行。将此选项设置为`0`将仅对根级父行应用过滤，所有子行保持未过滤状态。类似地，将此选项设置为`1`将仅对深度为1的子叶行应用过滤，依此类推。

这对于希望行的整个子层次结构在应用过滤器时可见的情况非常有用。

### `enableFilters`

```tsx
enableFilters?: boolean
```

启用/禁用表格的所有过滤器。

### `manualFiltering`

```tsx
manualFiltering?: boolean
```

禁用对数据进行过滤的`getFilteredRowModel`的使用。如果您的表格需要动态支持客户端和服务器端过滤，则可能会很有用。

### `onColumnFiltersChange`

```tsx
onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
```

如果提供，当`state.columnFilters`更改时，将使用`updaterFn`调用此函数。这将覆盖默认的内部状态管理，因此您需要在表格外部完全或部分地持久化状态更改。

### `enableColumnFilters`

```tsx
enableColumnFilters?: boolean
```

启用/禁用表格的**所有**列过滤器。

### `getFilteredRowModel`

```tsx
getFilteredRowModel?: (
  table: Table<TData>
) => () => RowModel<TData>
```

如果提供，此函数将**一次**调用每个表格，并应返回一个**新函数**，该函数在过滤表格时计算并返回表格的行模型。

- 对于服务器端过滤，此函数是不必要的，可以忽略，因为服务器应已返回过滤后的行模型。
- 对于客户端过滤，此函数是必需的。通过任何表格适配器的`{ getFilteredRowModel }`导出提供了一个默认实现。

示例：

```tsx
import { getFilteredRowModel } from '@tanstack/[adapter]-table'


  getFilteredRowModel: getFilteredRowModel(),
})
```

### `getColumnFacetedRowModel`

```tsx
getColumnFacetedRowModel: (columnId: string) => RowModel<TData>
```

返回给定列ID的分面行模型。

### `globalFilterFn`

```tsx
globalFilterFn?: FilterFn | keyof FilterFns | keyof BuiltInFilterFns
```

用于全局过滤的过滤函数。

选项：

- 引用[内置过滤函数](#filter-functions)的`string`
- 引用通过`tableOptions.filterFns`选项提供的自定义过滤函数的`string`
- [自定义过滤函数](#filter-functions)

### `onGlobalFilterChange`

```tsx
onGlobalFilterChange?: OnChangeFn<GlobalFilterState>
```

如果提供，当`state.globalFilter`更改时，将使用`updaterFn`调用此函数。这将覆盖默认的内部状态管理，因此您需要在表格外部完全或部分地持久化状态更改。

### `enableGlobalFilter`

```tsx
enableGlobalFilter?: boolean
```

启用/禁用表格的全局过滤。

### `getColumnCanGlobalFilter`

```tsx
getColumnCanGlobalFilter?: (column: Column<TData>) => boolean
```

如果提供，将使用列调用此函数，并应返回`true`或`false`，以指示是否应该使用此列进行全局过滤。如果列可能包含不是`string`或`number`（例如`undefined`）的数据，这将非常有用。

## Table API（表格 API）

### `setColumnFilters`

```tsx
setColumnFilters: (updater: Updater<ColumnFiltersState>) => void
```

设置或更新`state.columnFilters`状态。

### `resetColumnFilters`

```tsx
resetColumnFilters: (defaultState?: boolean) => void
```

将**columnFilters**状态重置为`initialState.columnFilters`，或者可以传递`true`以强制将默认空状态重置为`[]`。

### `getPreFilteredRowModel`

```tsx
getPreFilteredRowModel: () => RowModel<TData>
```

返回在应用任何**列**过滤之前的表格的行模型。

### `getFilteredRowModel`

```tsx
getFilteredRowModel: () => RowModel<TData>
```

返回在应用**列**过滤之后的表格的行模型。

### `setGlobalFilter`

```tsx
setGlobalFilter: (updater: Updater<any>) => void
```

设置或更新`state.globalFilter`状态。

### `resetGlobalFilter`

```tsx
resetGlobalFilter: (defaultState?: boolean) => void
```

将**globalFilter**状态重置为`initialState.globalFilter`，或者可以传递`true`以强制将默认空状态重置为`undefined`。

### `getGlobalAutoFilterFn`

```tsx
getGlobalAutoFilterFn: (columnId: string) => FilterFn<TData> | undefined
```

当前，此函数返回内置的`includesString`过滤函数。在将来的版本中，它可能会根据提供的数据的性质返回更动态的过滤函数。

### `getGlobalFilterFn`

```tsx
getGlobalFilterFn: (columnId: string) => FilterFn<TData> | undefined
```

返回表格的全局过滤函数（根据配置是用户定义的还是自动的）。

### `getGlobalFacetedRowModel`

```tsx
getGlobalFacetedRowModel: () => RowModel<TData>
```

返回全局过滤的分面行模型。

### `getGlobalFacetedUniqueValues`

```tsx
getGlobalFacetedUniqueValues: () => Map<any, number>
```

返回全局过滤的分面唯一值。

### `getGlobalFacetedMinMaxValues`

```tsx
getGlobalFacetedMinMaxValues: () => [number, number]
```

返回全局过滤的分面最小值和最大值。
