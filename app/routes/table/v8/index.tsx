import * as React from 'react'

import { CgCornerUpLeft } from 'react-icons/cg'
import {
  FaBolt,
  FaBook,
  FaCheckCircle,
  FaCogs,
  FaGithub,
} from 'react-icons/fa'
import { Link } from '@remix-run/react'
import { v8branch } from '../v8'
import { Footer } from '~/components/Footer'
import { IoIosBody } from 'react-icons/io'
import { VscPreview } from 'react-icons/vsc'

export const gradientText =
  'inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600'

const menu = [
  {
    label: (
      <div className="flex items-center gap-2">
        <CgCornerUpLeft className="text-lg" /> 中文站首页
      </div>
    ),
    to: '/',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <VscPreview className="text-lg" /> 示例代码
      </div>
    ),
    to: './docs/examples',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaBook className="text-lg" /> 文档
      </div>
    ),
    to: './docs/guide/introduction',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaGithub className="text-lg" /> GitHub
      </div>
    ),
    to: 'https://github.com/kirklin/TanStack-table-doc-cn',
  },
]


export default function ReactTableRoute() {
  const [framework, setFramework] = React.useState<
    'react' | 'svelte' | 'vue' | 'solid'
  >('react')

  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  }, [])

  return (
    <div className="flex flex-col gap-20 md:gap-32">
      <div
        className="flex flex-wrap py-2 px-4 items-center justify-center text-sm max-w-screen-xl mx-auto
          md:text-base md:self-end"
      >
        {menu?.map((item, i) => {
          const label = (
            <div className="p-2 opacity-90 hover:opacity-100">{item.label}</div>
          )

          return (
            <div key={i} className="hover:underline">
              {item.to.startsWith('http') ? (
                <a href={item.to}>{label}</a>
              ) : (
                <Link to={item.to} prefetch="intent">
                  {label}
                </Link>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h1
          className={`inline-block
            font-black text-4xl
            md:text-6xl
            lg:text-7xl`}
        >
          <span className={gradientText}>TanStack Table</span>{' '}
          <span
            className="text-[.5em] align-super text-black animate-bounce
              dark:text-white"
          >
            v8
          </span>
        </h1>
        <h2
          className="font-bold text-2xl max-w-md
            md:text-3xl
            lg:text-5xl lg:max-w-2xl"
        >
          <span className="underline decoration-dashed decoration-yellow-500 decoration-3 underline-offset-2">
            Headless
          </span>{' '}
          UI for building powerful tables & datagrids
        </h2>
        <p
          className="text opacity-90 max-w-sm
            lg:text-xl lg:max-w-2xl"
        >
          让您的表格功能强大，或者从头开始为TS/JS、React、Vue、Solid和Svelte构建数据表格，同时完全控制标记和样式。
        </p>
        <Link
          to="./docs/guide/introduction"
          className={`py-2 px-4 bg-teal-500 rounded text-white uppercase font-extrabold`}
          prefetch="intent"
        >
          开始阅读文档
        </Link>
      </div>
      <div
        className="text-lg flex flex-col gap-12 p-8 max-w-[1200px] mx-auto
                        md:flex-row"
      >
        <div className="flex-1 flex flex-col gap-8 items-center">
          <div className="text-center overflow-hidden">
            <IoIosBody className="text-teal-500 text-6xl -mt-5 mb-5 scale-125 origin-top" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="uppercase text-center text-xl font-black">
              专为零设计而打造
            </h3>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-6">
              如果您刚刚雇用的时髦设计师不能在这强大的表格上施展他们的UI魔法，那有什么好处呢？{' '}
              <span className="font-semibold text-teal-700 dark:text-teal-400">
                TanStack 表格采用 headless 设计
              </span>
              ，这意味着对于最小的HTML标签、组件、类和样式都有100%的控制权。像素完美？就去做吧！
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-8 items-center">
          <div className="text-center">
            <FaBolt className="text-blue-600 text-6xl" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="uppercase text-center text-xl font-black">
              大能量，小体积
            </h3>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-6">
              不要被小包装大小所迷惑。TanStack表格是一台干活的机器。它被构建用于利用非常小的API接口来实现实例化、过滤、排序、分组、聚合、分页和显示大规模数据集。将您的新表格或现有表格连接起来，然后
              <span className="font-semibold text-blue-700 dark:text-blue-400">
      观察您的用户立刻变得更加高效
           </span>
              。
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-8 items-center">
          <div className="text-center">
            <FaCogs className="text-indigo-500 text-6xl" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="uppercase text-center text-xl font-black">
              Extensible
            </h3>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-6">
              TanStack表格附带出色的默认设置，让您尽快启动，但您可以完全自由地进行定制和覆盖，
              <span className="font-semibold text-indigo-700 dark:text-indigo-400">
      以满足您的喜好
    </span>
              。有足够的毅力构建自己的Sheets/Excel/AirTable克隆吗？我们非常欢迎您的加入 😉
            </p>
          </div>

        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 mx-auto container">
        <div className=" sm:text-center pb-16">
          <h3 className="text-3xl text-center mx-auto leading-tight font-extrabold tracking-tight sm:text-4xl lg:leading-none mt-2">
            无框架限制 & 功能丰富
          </h3>
          <p className="mt-4 text-xl max-w-3xl mx-auto leading-7 opacity-60">
            TanStack Table的API和引擎都是高度模块化且与框架无关，同时优先考虑人性化设计。以下是必备功能列表：
          </p>
        </div>
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-4 w-[max-content] mx-auto">
          {[
            '轻量级 (10 - 15kb)',
            '树摇 (Tree-Shaking)',
            '无界面 (Headless)',
            '单元格格式化 (Cell Formatters)',
            '自动管理内部状态 (Auto-managed internal state)',
            '选择性完全控制状态 (Opt-in fully controlled state)',
            '排序 (Sorting)',
            '多重排序 (Multi Sort)',
            '全局过滤器 (Global Filters)',
            '列过滤器 (Columns Filters)',
            '分页 (Pagination)',
            '行分组 (Row Grouping)',
            '聚合 (Aggregation)',
            '行选择 (Row Selection)',
            '行展开 (Row Expansion)',
            '列排序 (Column Ordering)',
            '列可见性 (Column Visibility)',
            '列调整大小 (Column Resizing)',
            '可虚拟化 (Virtualizable)',
            '服务器端/外部数据 (Server-side/external Data)',
            '嵌套/分组表头 (Nested/Grouped Headers)',
            '页脚 (Footers)'
          ].map((d, i) => {
            return (
              <span key={i} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 " /> {d}
              </span>
            )
          })}
        </div>
      </div>

      <div>
        <div className="uppercase tracking-wider text-sm font-semibold text-center text-gray-400 mb-3">
          这些公司正在使用TanStack Table
        </div>
        {/* @ts-ignore */}
        <marquee scrollamount="2">
          <div className="flex gap-2 items-center text-3xl font-bold ml-[-100%]">
            {(new Array(4) as string[])
              .fill('')
              .reduce(
                (all) => [...all, ...all],
                [
                  'Intuit',
                  'Google',
                  'Amazon',
                  'Apple',
                  'AutoZone',
                  'Microsoft',
                  'Cisco',
                  'Uber',
                  'Salesforce',
                  'Walmart',
                  'Wix',
                  'HP',
                  'Docusign',
                  'Tripwire',
                  'Yahoo!',
                  'Ocado',
                  'Nordstrom',
                  'TicketMaster',
                  'Comcast Business',
                  'Nozzle.io',
                ]
              )
              .map((d, i) => (
                <span key={i} className="opacity-70 even:opacity-40">
                  {d}
                </span>
              ))}
          </div>
          {/* @ts-ignore */}
        </marquee>
      </div>

      <div className="flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8  mx-auto container max-w-3xl sm:text-center">
          <h3 className="text-3xl text-center leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none mt-2">
            让我们试试看吧！🎡
          </h3>
          <p className="my-4 text-xl leading-7  text-gray-600">
            只需一些基本样式、一些表格标记和少数列，您就已经在创建一个非常强大的表格的路上了。
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {(
              [
                { label: 'React', value: 'react' },
                { label: 'Solid', value: 'solid' },
                { label: 'Svelte', value: 'svelte' },
                { label: 'Vue', value: 'vue' },
              ] as const
            ).map((item) => (
              <button
                key={item.value}
                className={`inline-block py-2 px-4 rounded text-white uppercase font-extrabold ${
                  item.value === framework
                    ? 'bg-rose-500'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-rose-300'
                }`}
                onClick={
                  () => setFramework(item.value)
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-black">
        <iframe
          key={framework}
          src={`https://codesandbox.io/embed/github/tanstack/table/tree/${v8branch}/examples/${framework}/basic?autoresize=1&fontsize=16&theme=${
            isDark ? 'dark' : 'light'
          }`}
          title="tannerlinsley/react-table: basic"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className="shadow-2xl"
          loading="lazy"
          style={{
            width: '100%',
            height: '80vh',
            border: '0',
          }}
        ></iframe>
      </div>
      <Footer />
    </div>
  )
}
