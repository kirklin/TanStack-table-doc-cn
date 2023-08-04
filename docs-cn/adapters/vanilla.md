---
title: 原生 TS/JS
---

`@tanstack/table-core`库包含了TanStack Table的核心逻辑。如果你正在使用非标准的框架或者没有框架的访问权限，你可以直接使用核心库来进行TypeScript或JavaScript开发。

## `createTable`

接受一个`options`对象，并返回一个表格。

```tsx
import { createTable } from '@tanstack/table-core'

const table = createTable(options)
```
