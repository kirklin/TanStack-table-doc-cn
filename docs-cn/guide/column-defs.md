---
title: 列定义
---

## API

[表格 API](../api/core/table)

## 指南

列定义是构建表格的最重要部分。它们负责以下任务：

- 构建底层数据模型，用于排序、过滤、分组等操作。
- 将数据模型格式化为表格中显示的内容。
- 创建[表头组](./api/core/header-group)、[表头](./api/core/header)和[表尾](./api/core/column-def#footer)。
- 创建仅用于显示的列，例如操作按钮、复选框、展开器、小型图表等。

## 列定义类型

以下列定义的“类型”实际上不是 TypeScript 类型，而是一种描述列定义整体类别的方式：

- `“访问器列” Accessor Columns`
  - 访问器列具有底层数据模型，因此可以进行排序、过滤、分组等操作。
- `“显示列” Display Columns`
  - 显示列没有数据模型，因此无法进行排序、过滤等操作，但可以用于在表格中显示任意内容，例如行操作按钮、复选框、展开器等。
- `“分组列 Grouping Columns”`
  - 分组列没有数据模型，因此也无法进行排序、过滤等操作，它们用于将其他列分组在一起。通常为列组定义表头或表尾。

## 列助手

虽然列定义实际上只是普通的对象，但表格核心库提供了一个`createColumnHelper`函数，该函数在调用时传入行类型，返回一个具有最高类型安全性的创建不同列定义类型的实用程序。

下面是创建和使用列助手的示例：

```tsx
// 定义行的TS类型
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()

// 创建一些列！
const defaultColumns = [
  // 显示列
  columnHelper.display({
    id: 'actions',
    cell: props => <RowActions row={props.row} />,
  }),
  // 分组列
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      // 访问器列
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
      }),
      // 访问器列
      columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      }),
    ],
  }),
  // 分组列
  columnHelper.group({
    header: 'Info',
    footer: props => props.column.id,
    columns: [
      // 访问器列
      columnHelper.accessor('age', {
        header: () => 'Age',
        footer: props => props.column.id,
      }),
      // 分组列
      columnHelper.group({
        header: 'More Info',
        columns: [
          // 访问器列
          columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
            footer: props => props.column.id,
          }),
          // 访问器列
          columnHelper.accessor('status', {
            header: 'Status',
            footer: props => props.column.id,
          }),
          // 访问器列
          columnHelper.accessor('progress', {
            header: 'Profile Progress',
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
  }),
]
```

## 创建访问器列

数据列的独特之处在于必须配置以提取`data`数组中每个项的原始值。

有三种方法可以实现这一点：

- 如果您的项是`对象`，请使用与要提取的值对应的对象键。
- 如果您的项是嵌套的`数组`，请使用与要提取的值对应的数组索引。
- 使用返回要提取的值的访问器函数。

## 对象键

如果每个项都是具有以下TS类型的对象：

```tsx
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}
```

您可以像这样提取`firstName`值：

```tsx

columnHelper.accessor('firstName')

// 或者

{
  accessorKey: 'firstName',
}
```

## 数组索引

如果每个项都是具有以下TS类型的数组：

```tsx
type Sales = [Date, number]
```

您可以像这样提取`number`值：

```tsx
columnHelper.accessor(1)

// 或者

{
  accessorKey: 1,
}
```

## 访问器函数

如果每个项都是具有以下TS类型的对象：

```tsx
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}
```

您可以像这样提取计算得到的全名值：

```tsx
columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
  id: 'fullName',
})

// 或者

{
  id: 'fullName',
  accessorFn: row => `${row.firstName} ${row.lastName}`,
}
```

> 🧠 请记住，访问的值是用于排序、过滤等操作的值，因此您需要确保访问器函数返回一个可以进行有意义操作的原始值。如果返回的是非原始值，例如对象或数组，您将需要适当的过滤/排序/分组函数来操作它们，甚至可以自己提供！ 😬

## 唯一的列 ID

列使用三种策略进行唯一标识：

- 如果使用对象键或数组索引定义访问器列，将使用相同的键或索引来唯一标识列。
- 如果使用访问器函数定义访问器列
  - 将使用列的`id`属性来唯一标识列，或者
  - 如果提供了原始的`string`表头，将使用该表头字符串来唯一标识列

> 🧠 一个简单的记忆方法：如果使用访问器函数定义列，请提供一个字符串表头或提供一个唯一的`id`属性。

## 列格式化和渲染

默认情况下，列单元格将以字符串形式显示其数据模型值。您可以通过提供自定义的渲染实现来覆盖此行为。每个实现都会提供有关单元格、表头或表尾的相关信息，并返回您的框架适配器可以渲染的内容，例如 JSX/组件/字符串等。这将取决于您使用的适配器。

您可以使用以下几种格式化程序：

- `cell`：用于格式化单元格。
- `aggregatedCell`：用于格式化聚合单元格。
- `header`：用于格式化表头。
- `footer`：用于格式化表尾。

## 单元格格式化

您可以通过将函数传递给`cell`属性，并使用`props.getValue()`函数访问单元格的值，来提供自定义的单元格格式化程序：

```tsx
columnHelper.accessor('firstName', {
  cell: props => <span>{props.getValue().toUpperCase()}</span>,
})
```

单元格格式化程序还会提供`row`和`table`对象，使您能够在单元格值之外自定义单元格格式化。下面的示例将`firstName`作为访问器，但还显示了原始行对象上的前缀用户 ID：

```tsx
columnHelper.accessor('firstName', {
  cell: props => (
    <span>{`${props.row.original.id} - ${props.getValue()}`}</span>
  ),
})
```

## 聚合单元格格式化

有关聚合单元格的更多信息，请参见[分组](../guide/grouping)。

## 表头和表尾格式化

表头和表尾无法访问行数据，但仍然使用相同的概念来显示自定义内容。
