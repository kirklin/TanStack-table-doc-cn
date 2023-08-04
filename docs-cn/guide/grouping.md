---
title: 分组
---

## 示例

想要直接查看实现代码？请查看以下示例：

- [grouping](../examples/react/grouping)

## API

[分组 API](../api/features/grouping)

## 概述

有三个表格功能可以重新排序列，按照以下顺序进行：

1. [列固定](../guide/column-pinning) - 如果进行了固定，列会被分为左侧、中间（未固定）和右侧固定列。
2. 手动[列排序](../guide/column-ordering) - 应用手动指定的列顺序。
3. **分组** - 如果启用了分组，存在分组状态，并且 `tableOptions.columnGroupingMode` 设置为 `'reorder' | 'remove'`，则分组的列会被重新排序到列流的开头。
