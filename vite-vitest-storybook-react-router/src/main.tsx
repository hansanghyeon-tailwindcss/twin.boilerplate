import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import { pipe, flow } from 'fp-ts/function'
import * as A from 'fp-ts/Array'

// ============================================= ROUTER START
// 파일기반의 라우팅을 위한 glob 패턴
const COMPONENTS = pipe(
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
  const LazyComponent = React.lazy(() => import(path));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

const router = createBrowserRouter(
  pipe(
    COMPONENTS,
    A.map(({ path, filePath }) => {
      console.log(filePath)
      return {
        path,
        element: <App><DynamicComponent path={filePath} /></App>,
      }
    })
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
