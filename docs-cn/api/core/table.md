---
title: Table
---

## `useReactTable` / `createSolidTable` / `useVueTable` / `createSvelteTable`

这些函数用于创建表格。使用哪个函数取决于您使用的框架适配器。

## Options

这些是表格的**核心**选项和API属性。其他[表格功能](../../guide/features)还提供了更多选项和API属性。

### `data`

表格要显示的数据。

### `columns`

用于表格的列定义数组。

### `defaultColumn`

用于所有列定义的默认列选项。

### `initialState`

可选的初始状态。

### `autoResetAll`

用于覆盖`autoReset...`功能选项。

### `meta`

可以传递任何对象给`options.meta`，并且可以在`table`可用的任何地方通过`table.options.meta`访问。此类型对所有表格全局，并且可以通过声明合并进行扩展。

### `state`

可选地控制表格状态。

### `onStateChange`

可选地监听表格状态的更改。

### `debugAll`

将此选项设置为`true`，以将所有调试信息输出到控制台。

### `debugTable`

将此选项设置为`true`，以将表格的调试信息输出到控制台。

### `debugHeaders`

将此选项设置为`true`，以将表头的调试信息输出到控制台。

### `debugColumns`

将此选项设置为`true`，以将列的调试信息输出到控制台。

### `debugRows`

将此选项设置为`true`，以将行的调试信息输出到控制台。

### `render`

提供表格的渲染器实现。

### `mergeOptions`

用于可选地实现表格选项的合并。

### `getCoreRowModel`

用于计算并返回表格的核心行模型的函数。

### `getSubRows`

用于访问给定行的子行的可选函数。

### `getRowId`

用于为给定行派生唯一ID的可选函数。

## Table API

这些属性和方法可在表格对象上使用：

### `initialState`

表格的初始状态。

### `reset`

将表格状态重置为初始状态。

### `getState`

获取表格的当前状态。

### `setState`

更新表格的状态。

### `options`

表格的当前选项的只读引用。

### `setOptions`

更新表格的选项。

### `getCoreRowModel`

返回应用任何处理之前的核心行模型。

### `getRowModel`

返回应用了其他使用的功能的所有处理之后的最终模型。

### `getAllColumns`

返回表格中的所有列。

### `getAllFlatColumns`

返回表格中的所有列，展平为单个级别。

### `getAllLeafColumns`

返回表格中的所有叶子节点列，展平为单个级别。

### `getColumn`

按ID返回单个列。

### `getHeaderGroups`

返回表格的表头组。

### `getFooterGroups`

返回表格的表尾组。

### `getFlatHeaders`

返回表格的扁平化表头对象数组，包括父表头。

### `getLeafHeaders`

返回表格的扁平化叶子节点表头对象数组。
