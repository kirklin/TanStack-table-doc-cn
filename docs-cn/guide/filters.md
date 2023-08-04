---
title: 过滤器
---

## 示例

想要直接查看实现代码？请查看以下示例：

- [过滤器](../examples/react/filters)（包括分面）
- [可编辑数据](../examples/react/editable-data)
- [展开](../examples/react/expanding)
- [分组](../examples/react/grouping)
- [分页](../examples/react/pagination)
- [行选择](../examples/react/row-selection)

## API

[过滤器 API](../api/features/filters)

## 概述

过滤器有两种类型：

- 列过滤器
  - 应用于单个列的访问器值的过滤器。
  - 存储在 `state.columnFilters` 数组中，作为包含列ID和过滤器值的对象。
- 全局过滤器
  - 应用于所有或部分列的访问器值的单个过滤器值。
  - 存储在 `state.globalFilter` 数组中，通常是一个字符串。
