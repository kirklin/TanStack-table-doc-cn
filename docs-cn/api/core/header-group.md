---
title: HeaderGroup
---

这些是所有表头组的**核心**选项和API属性。其他[表格功能](../../guide/features)可能还有更多选项和API属性。

## 表头组API

所有表头组对象都具有以下属性：

### `id`

```tsx
id: string
```

表头组的唯一标识符。

### `depth`

```tsx
id: number
```

表头组的深度，从零开始计数。

### `headers`

```tsx
type headers = Header<TData>[]
```

属于此表头组的[Header](./Header)对象的数组。
