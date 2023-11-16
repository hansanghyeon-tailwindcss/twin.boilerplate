import React, { Suspense } from 'react'
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as R from 'fp-ts/Record'
import { type RouteWithChildrenInterface } from './routing-interface'
import { ErrorBoundary } from 'react-error-boundary'

// ============================================= ROUTER START
// 파일기반의 라우팅을 위한 glob 패턴
const pages = pipe(
  import.meta.glob('/src/pages/**/[a-z[]*.tsx'),
  R.filterWithIndex((k) => !k.includes('auth') && !k.includes('api')),
  // 파일 목록만 가져오는 방법
  Object.entries,
  A.map(([key, module]) => ({
    path: key
      .replace(/\/src\/pages|index|\.tsx$/g, '')
      .replace(/\[\.{3}.+\]/, '*')
      .replace(/\[(.+)\]/, ':$1'),
    module,
  }))
)

const DynamicComponent = ({ module }: { module: any }) => {
  const LazyComponent = React.lazy(module)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}

const router: RouteWithChildrenInterface[] = pipe(
  pages,
  A.map(({ path, module }) => ({
    path: (locale: string) => `/${locale}${path}`,
    element: <DynamicComponent module={module} />,
  }))
)

export default router