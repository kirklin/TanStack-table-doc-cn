---
title: Svelte 表格
---

`@tanstack/svelte-table` 适配器是核心表格逻辑的包装器。它的大部分工作与以 "svelte" 方式管理状态、提供类型以及渲染单元格/表头/表尾模板相关。

## `createSvelteTable`

接受一个 `options` 对象，并返回一个表格。

```svelte
<script>

import { createSvelteTable } from '@tanstack/svelte-table'

const table = createSvelteTable(options)

</script>
```
