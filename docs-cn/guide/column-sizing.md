---
title: 列尺寸
---

## 示例

想要直接查看实现代码？请查看以下示例：

- [column-sizing](../examples/react/column-sizing)

## API

[Column Sizing API](../api/features/column-sizing)

## 概述

列大小调整功能允许您可选地指定每列的宽度，包括最小和最大宽度。它还允许您和用户随意动态更改所有列的宽度，例如通过拖动列标题。

默认情况下，列被赋予以下测量选项：

```tsx
export const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER,
}
```

这些默认值可以通过`tableOptions.defaultColumn`和单个列定义进行覆盖，按照这个顺序。

作为一个无头工具，表格列大小调整的逻辑实际上只是一组状态，您可以根据自己的布局需求应用它们（我们上面的示例实现了两种样式的逻辑）。您可以以多种方式应用这些宽度测量：

- `table`元素或以表格CSS模式显示的任何元素
- `div/span`元素或以非表格CSS模式显示的任何元素
  - 具有固定宽度的块级元素
  - 具有固定宽度的绝对定位元素
  - 具有宽松宽度的Flexbox定位元素
  - 具有宽松宽度的Grid定位元素
- 实际上，任何可以将单元格宽度插入表格结构的布局机制。

每种方法都有其自己的权衡和限制，通常是由UI/组件库或设计系统持有的观点，幸运的是，这不是您的问题😉。
