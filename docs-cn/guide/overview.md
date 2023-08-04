---
title: 概述
---

TanStack Table的核心是**框架无关**的，这意味着无论你使用哪个框架，它的API都是相同的。根据你使用的框架，提供了适配器来更轻松地使用表格核心。请查看适配器菜单以获取可用的适配器。

## TypeScript

虽然TanStack Table是用[TypeScript](https://www.typescriptlang.org/)编写的，但在应用程序中使用TypeScript是可选的（但建议使用，因为它对您和您的代码库都有很多好处）。

## Headless

正如在[Intro](./guide/introduction)部分中广泛提到的，TanStack Table是**Headless**的。这意味着它不会渲染任何DOM元素，而是依赖于您作为UI/UX开发人员提供表格的标记和样式。这是一种构建可以在任何UI框架中使用的表格的好方法，包括React、Vue、Solid，甚至是React Native等JS到原生平台！

## 核心对象和类型

表格核心使用以下抽象，适配器通常会公开这些抽象：

- 列定义（Column Defs）
  - 用于配置列及其数据模型、显示模板等的对象
- 表格（Table）
  - 包含状态和API的核心表格对象
- 表格数据（Table Data）
  - 您提供给表格的核心数据数组
- 列（Columns）
  - 每个列镜像其相应的列定义，并提供列特定的API
- 行（Rows）
  - 每行镜像其相应的行数据，并提供行特定的API
- 头部分组（Header Groups）
  - 头部分组是嵌套头部级别的计算切片，每个切片包含一组头部
- 头部（Headers）
  - 每个头部要么直接关联于其列定义，要么派生自其列定义，并提供头部特定的API
- 单元格（Cells）
  - 每个单元格镜像其相应的行列交叉点，并提供单元格特定的API

还有更多与特定功能（如过滤、排序、分组等）相关的结构，您可以在[features](./guide/features)部分找到。
