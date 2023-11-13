import React, { Suspense } from 'react'
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import { type RouteWithChildrenInterface } from './routing-interface'

// ============================================= ROUTER START
// 파일기반의 라우팅을 위한 glob 패턴
const pages = pipe(
  import.meta.glob('/src/pages/**/[a-z[]*.tsx'),
  // 파일 목록만 가져오는 방법
  Object.keys,
  A.map(e => {
    return {
      path: e.replace(/\/src\/pages|index|\.tsx$/g, '').replace(/\[\.{3}.+\]/, '*').replace(/\[(.+)\]/, ':$1'),
      filePath: e
    }
  })
);

const DynamicComponent = ({ path }: { path: string }) => {
  const LazyComponent = React.lazy(() => import(/* @vite-ignore */path));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

const router: RouteWithChildrenInterface[] = pipe(
  pages,
  A.map(({ path, filePath }) => {
    return {
      path: (locale: string) => `/${locale}${path}`,
      element: <DynamicComponent path={filePath} />,
    }
  })
)

export default router