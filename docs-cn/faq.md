---
title: 常见问题解答
---

## 如何阻止表格状态在数据更改时自动重置？

大多数插件在数据源更改时会自动重置状态，但有时候你需要阻止这种情况发生，比如在外部过滤数据、在查看数据时进行不可变编辑，或者在对数据进行其他外部操作时不希望触发表格状态的自动重置。

针对这些情况，每个插件都提供了一种方法来在数据或其他依赖项更改时禁用状态的自动重置。通过将其中任何一个设置为`false`，你可以阻止自动重置的触发。

下面是一个基于React的示例，演示了在编辑表格的`data`源时如何停止几乎所有状态的正常更改：

```js
const [data, setData] = React.useState([])
const skipPageResetRef = React.useRef()

const updateData = newData => {
  // 当使用此函数更新数据时，设置一个标志来禁用所有自动重置
  skipPageResetRef.current = true

  setData(newData)
}

React.useEffect(() => {
  // 表格更新后，始终移除标志
  skipPageResetRef.current = false
})

useReactTable({
  ...
  autoResetPageIndex: !skipPageResetRef.current,
  autoResetExpanded: !skipPageResetRef.current,
})
```

现在，当我们更新数据时，上述表格状态将不会自动重置！
