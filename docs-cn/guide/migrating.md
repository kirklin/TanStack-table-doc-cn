---
title: 迁移到V8版本
---

## 迁移到V8版本

TanStack Table V8是React Table v7的一次重大重写，完全采用TypeScript编写。您的标记和CSS的整体结构/组织大部分保持不变，但许多API已被重命名或替换。

### 主要变化

- 完全重写为TypeScript，并将类型包含在基础包中
- 删除插件系统，更倾向于更多的控制反转
- 大幅增加和改进的API（以及新功能，如固定）
- 更好的受控状态管理
- 更好地支持服务器端操作
- 完整（但可选）的数据管道控制
- 通用核心，为React、Solid、Svelte、Vue等框架提供适配器，并可能在将来提供更多适配器
- 新的开发者工具

### 安装新版本

TanStack Table的新版本发布在`@tanstack`作用域下。使用您喜欢的包管理器安装新包：

```bash
npm uninstall react-table @types/react-table
npm install @tanstack/react-table
```

```diff
- import { useTable } from 'react-table'
+ import { useReactTable } from '@tanstack/react-table'
```

类型现在包含在基础包中，因此您可以删除`@types/react-table`包。

> 如果您愿意，可以保留旧的`react-table`包安装，以便逐步迁移代码。您应该能够在不同的表格中同时使用这两个包而没有任何问题。

### 更新表格选项

- 将`useTable`重命名为`useReactTable`
- 删除了旧的hook和插件系统，但它们已被替换为每个功能的可树摇动行模型导入。

```diff
- import { useTable, usePagination, useSortBy } from 'react-table';
+ import {
+   useReactTable,
+   getCoreRowModel,
+   getPaginationRowModel,
+   getSortedRowModel
+ } from '@tanstack/react-table';

// ...

-   const tableInstance = useTable(
-     { columns,  data },
-     useSortBy,
-     usePagination, //hook的顺序很重要
-     // 等等
-   );
+   const tableInstance = useReactTable({
+     columns,
+     data,
+     getCoreRowModel: getCoreRowModel(),
+     getPaginationRowModel: getPaginationRowModel(),
+     getSortedRowModel: getSortedRowModel(), //hook的顺序不再重要！
+     // 等等
+   });
```

- 所有`disable*`表格选项已重命名为`enable*`表格选项（例如，`disableSortBy`现在是`enableSorting`，`disableGroupBy`现在是`enableGrouping`等）。
- ...

### 更新列定义

- `accessor`被重命名为`accessorKey`或`accessorFn`（取决于您是使用字符串还是函数）
- `width`、`minWidth`、`maxWidth`被重命名为`size`、`minSize`、`maxSize`
- 可选地，您可以在每个列定义周围使用新的`createColumnHelper`函数，以获得更好的TypeScript提示（如果您喜欢，仍然可以只使用列定义的数组）。
  - 第一个参数是访问器函数或访问器字符串。
  - 第二个参数是列选项的对象。

```diff
const columns = [
-  {
-    accessor: 'firstName',
-    Header: 'First Name',
-  },
-  {
-    accessor: row => row.lastName,
-    Header: () => <span>Last Name</span>,
-  },

// 最佳的TypeScript体验，特别是在稍后使用`cell.getValue()`时
+  columnHelper.accessor('firstName', { //accessorKey
+    header: 'First Name',
+  }),
+  columnHelper.accessor(row => row.lastName, { //accessorFn
+    header: () => <span>Last Name</span>,
+  }),

// 或者（如果您喜欢）
+ {
+   accessorKey: 'firstName',
+   header: 'First Name',
+ },
+ {
+   accessorFn: row => row.lastName,
+   header: () => <span>Last Name</span>,
+ },
]
```

> 注意：如果在组件内定义列，请仍然尽量给列定义一个稳定的标识。这将有助于性能并防止不必要的重新渲染。将列定义存储在`useMemo`或`useState` hook中。

- 列选项名称更改

  - `Header`被重命名为`header`
  - `Cell`被重命名为`cell`（单元格渲染函数也已更改，请参见下文）
  - `Footer`被重命名为`footer`
  - 所有`disable*`列选项已重命名为`enable*`列选项（例如，`disableSortBy`现在是`enableSorting`，`disableGroupBy`现在是`enableGrouping`等）。
  - `sortType`是`sortingFn`
  - ...

- 自定义单元格渲染器的更改

  - `value`被重命名为`getValue`（在升级过程中，不再直接提供值，而是提供了一个函数`getValue`来评估值。此更改旨在通过仅在调用`getValue()`时评估值并缓存它来提高性能。）
  - `cell: { isGrouped, isPlaceholder, isAggregated }`现在是`cell: { getIsGrouped, getIsPlaceholder, getIsAggregated }`
  - `column`：基本级别的props现在是RT特定的。在定义时添加到对象中的值现在在`columnDef`中更深一层。
  - `table`：传递给`useTable` hook的props现在出现在`options`下。

### 迁移表格标记

- 使用`flexRender()`代替`cell.render('Cell')`或`column.render('Header')`等。
- `getHeaderProps`、`getFooterProps`、`getCellProps`、`getRowProps`等都已被_弃用_。
  - TanStack Table不再提供任何默认的`style`或可访问性属性，如`role`。这些仍然对您的正确性很重要，但为了支持框架无关性，必须将其删除。
  - 您需要手动定义`onClick`处理程序，但有新的`get*Handler`辅助函数可以使此过程简单。
  - 您需要手动定义`key` props
  - 如果使用需要它的功能（分组标题、聚合等），您需要手动定义`colSpan` prop。

```diff
- <th {...header.getHeaderProps()}>{cell.render('Header')}</th>
+ <th colSpan={header.colSpan} key={column.id}>
+   {flexRender(
+     header.column.columnDef.header,
+     header.getContext()
+   )}
+ </th>
```

```diff
- <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
+ <td key={cell.id}>
+   {flexRender(
+     cell.column.columnDef.cell,
+     cell.getContext()
+   )}
+ </td>
```

```diff
// 在此示例中的列定义中
- Header: ({ getToggleAllRowsSelectedProps }) => (
-   <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
- ),
- Cell: ({ row }) => (
-   <input type="checkbox" {...row.getToggleRowSelectedProps()} />
- ),
+ header: ({ table }) => (
+   <Checkbox
+     checked={table.getIsAllRowsSelected()}
+     indeterminate={table.getIsSomeRowsSelected()}
+     onChange={table.getToggleAllRowsSelectedHandler()}
+   />
+ ),
+ cell: ({ row }) => (
+   <Checkbox
+     checked={row.getIsSelected()}
+     disabled={!row.getCanSelect()}
+     indeterminate={row.getIsSomeSelected()}
+     onChange={row.getToggleSelectedHandler()}
+   />
+ ),
```

### 其他更改

- 自定义`filterTypes`（现在称为`filterFns`）的函数签名已更改，因为它只返回一个布尔值，表示是否应包含该行。

```diff
- (rows: Row[], id: string, filterValue: any) => Row[]
+ (row: Row, id: string, filterValue: any) => boolean
```

- ...

> 此指南仍在进行中。如果您有时间，请考虑为其做出贡献！
