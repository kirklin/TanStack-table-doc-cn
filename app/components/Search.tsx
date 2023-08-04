import type {
  DocSearchProps} from '@docsearch/react';
import {
  DocSearch
} from '@docsearch/react'

export function Search(props: DocSearchProps) {
  return <DocSearch {...props} />
}
