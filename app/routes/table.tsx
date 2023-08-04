import { LoaderArgs, MetaFunction, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { seo } from '~/utils/seo'

export let meta: MetaFunction = () => {
  return seo({
    title: 'TanStack Table | React Table, Solid Table, Svelte Table, Vue Table',
    description:
      'Headless UI for building powerful tables & datagrids with TS/JS, React, Solid, Svelte and Vue',
    image: 'https://github.com/kirklin/TanStack-table-doc-cn/raw/main/media/repo-header.png',
  })
}

export const loader = async (context: LoaderArgs) => {
  if (!context.request.url.includes('/table/v')) {
    return redirect(`${new URL(context.request.url).origin}/table/v8`)
  }

  return new Response('OK')
}

export default function RouteReactTable() {
  return <Outlet />
}
