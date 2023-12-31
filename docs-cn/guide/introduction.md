---
title: 介绍
---

TanStack Table是一个用于构建强大的表格和数据网格的**HeadlessUI**库，适用于TS/JS、React、Vue、Solid和Svelte。

## 什么是"Headless"UI？

**HeadlessUI**是指提供UI元素和交互的逻辑、状态、处理和API的库和工具，但**不提供标记、样式或预构建的实现**。你是否感到困惑了？😉 HeadlessUI有几个主要目标：

构建复杂UI的最困难的部分通常涉及状态、事件、副作用和数据计算/管理。通过从标记、样式和实现细节中移除这些问题，我们的逻辑和组件可以更模块化和可重用。

构建UI是一个非常品牌化和定制化的体验，即使这意味着选择一个设计系统或遵循设计规范。为了支持这种定制化体验，基于组件的UI库需要支持一个庞大（看似无穷无尽）的API表面，围绕标记和样式的自定义。HeadlessUI库将逻辑与UI解耦。

当你使用HeadlessUI库时，**数据处理、状态管理和业务逻辑**这些复杂的任务都已经为你处理好了，让你只需要关注在不同实现和用例中不同的高基数决策。

> 想要深入了解吗？[阅读更多关于HeadlessUI的内容](https://www.merrickchristensen.com/articles/headless-user-interface-components/)。

## 基于组件的库 vs Headless库

在表格/数据网格库的生态系统中，有两个主要类别：

- 基于组件的表格库
- Headless表格库

### 我应该使用哪种类型的表格库？

每种方法都有微妙的权衡。了解这些细微之处将有助于您为您的应用程序和团队做出正确的决策。

### 基于组件的表格库

基于组件的表格库通常会为您提供一个功能丰富的即插即用解决方案，并提供完整的组件/标记，包括样式/主题。

**优点：**

- 提供即插即用的标记/样式
- 需要很少的设置
- 一站式体验

**缺点：**

- 对标记的控制较少
- 自定义样式通常基于主题
- 较大的捆绑包大小
- 与框架适配器和平台高度耦合

**如果您想要一个即插即用的表格，并且设计/捆绑包大小不是硬性要求**，那么您应该考虑使用基于组件的表格库。

### Headless表格库

Headless表格库通常会为您提供函数、状态、实用工具和事件监听器，以构建自己的表格标记或附加到现有的表格标记上。

**优点：**

- 对标记和样式有完全控制权
- 支持所有样式模式（CSS、CSS-in-JS、UI库等）
- 较小的捆绑包大小
- 可移植。在任何支持JS的地方运行！

**缺点：**

- 需要更多的设置
- 不提供标记、样式或主题

**如果您想要一个更轻量级的表格或对设计有完全控制权**，那么您应该考虑使用Headless表格库。

市面上很少有Headless表格库，而且显然，**TanStack Table**是我们最喜欢的！
