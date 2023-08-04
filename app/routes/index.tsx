import {
  Link,
  useActionData,
  useLoaderData,
  useTransition,
} from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { twMerge } from 'tailwind-merge'
import {  FaGithub } from 'react-icons/fa'
import { Footer } from '~/components/Footer'
import { LinkOrA } from '~/components/LinkOrA'

const gradients = [
  `from-rose-500 to-yellow-500`,
  `from-yellow-500 to-teal-500`,
  `from-teal-500 to-violet-500`,
  `from-blue-500 to-pink-500`,
]

const menu = [
  {
    label: (
      <div className="flex items-center gap-1">
        <FaGithub className="text-lg" /> GitHub
      </div>
    ),
    to: 'https://github.com/kirklin/TanStack-table-doc-cn',
  },
]

const libraries = [
  {
    name: 'TanStack Table',
    getStyles: () =>
      `shadow-xl shadow-blue-700/20 dark:shadow-lg dark:shadow-blue-500/30 text-blue-500 border-2 border-transparent hover:border-current`,
    to: '/table',
    tagline: `Headless UI for building powerful tables & datagrids`,
    description: `TanStack/table 是一个功能强大的用于创建表格的工具，而这个项目的目标是让其文档能够被更广泛的中文使用者所了解和利用。`,
  },
]


export const loader = async () => {
  return json({
    randomNumber: Math.random(),
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  return fetch(`https://bytes.dev/api/bytes-optin-cors`, {
    method: 'POST',
    body: JSON.stringify({
      email: formData.get('email_address'),
      influencer: 'tanstack',
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

function sample(arr: any[], random = Math.random()) {
  return arr[Math.floor(random * arr.length)]
}

export default function Index() {
  const data = useActionData()
  const { randomNumber } = useLoaderData<typeof loader>()
  const transition = useTransition()

  const gradient = sample(gradients, randomNumber)

  return (
    <>
      <div
        className="flex flex-wrap py-2 px-4 items-center justify-center text-sm
          md:text-base md:justify-end"
      >
        {menu?.map((item, i) => {
          const label = (
            <div className="p-2 opacity-90 hover:opacity-100">{item.label}</div>
          )

          return (
            <div key={i} className="hover:underline">
              {item.to.startsWith('http') ? (
                <a href={item.to} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ) : (
                <Link to={item.to} prefetch="intent">
                  {label}
                </Link>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex flex-col items-center gap-6 text-center px-4 py-12 lg:py-24">
        <h1
          className={`inline-block
            font-black text-5xl
            md:text-6xl
            lg:text-8xl`}
        >
          <span
            className={`
            inline-block text-transparent bg-clip-text bg-gradient-to-r ${gradient}
            underline decoration-8 underline-offset-[1rem] decoration-gray-200 dark:decoration-gray-800
            mb-2
            `}
          >
            TanStack Docs CN
          </span>
        </h1>
        <h2
          className="font-bold text-2xl max-w-md
            md:text-3xl
            lg:text-5xl lg:max-w-2xl"
        >
          TanStack-doc-cn 是一个由社区驱动的项目
        </h2>
      </div>
      <div className="h-8" />
      <div className="px-4 lg:max-w-screen-lg md:mx-auto">
        <h3 className={`text-4xl font-light`}>已翻译的库</h3>
        <div
          className={`mt-4 grid grid-cols-1 gap-8
            sm:grid-cols-2 sm:gap-4
            lg:grid-cols-3`}
        >
          {libraries.map((library, i) => {
            return (
              <LinkOrA
                key={library.name}
                to={library.to ?? '#'}
                className={twMerge(
                  `border-4 border-transparent rounded-lg shadow-lg p-4 md:p-8 text-white transition-all bg-white dark:bg-gray-800`,
                  library.getStyles()
                )}
                style={{
                  zIndex: i,
                }}
                prefetch="intent"
              >
                <div className={`text-lg italic font-light mt-2`}>
                  {library.tagline}
                </div>
                <div className={`text-sm mt-2 text-black dark:text-white`}>
                  {library.description}
                </div>
              </LinkOrA>
            )
          })}
        </div>
      </div>
      <div className={`h-20`} />
      <Footer />
    </>
  )
}
