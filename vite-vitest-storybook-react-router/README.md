<a href="https://stackblitz.com/github/Hansanghyeon/twin.macro-boilerplate/vite-vitest-storybook-react-router">
  <img
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg"
  />
</a>


<a href="https://stackblitz.com/github/Hansanghyeon/twin.macro-boilerplate/vite-vitest-storybook-react-router

[![Stackblitz](https://img.shields.io/badge/Stackblitz-fff?style=for-the-badge&logo=Stackblitz&logoColor=1389FD)](https://stackblitz.com/fork/github/hansanghyeon/boilerplate/twin.macro-vite-vitest-storybook-react-router)

```sh
npx degit https://github.com/hansanghyeon/boilerplate/twin-vite-vitest-storybook-react-router example-project
```

이 저장소는 [hansanghyeon/boilerplate/twin-vite-vitest-storybook-react-router](https://github.com/hansanghyeon/boilerplate/twin-vite-vitest-storybook-react-router) 기반으로 react-router 파일기반의 라우터를 추가하였다.

추가된 사항

```bash
npx sb@next init --builder vite
```

module type으로 설정해야해서 storybook 7버전을 사용합니다.


## 파일 시스템 기반 라우팅

- 인덱스 라우팅
  - `src/pages/index.tsx` -> `/`
  - `src/pages/user/index.tsx` -> `/user`
- 중첩 라우팅
  - `src/pages/user/list.tsx` -> `/user/list`
- 동적 라우팅
  - `src/pages/user/[id].tsx` -> `/user/12` `/user/34`


### 라우팅 규칙 정의

https://medium.com/@shubham3480/dynamic-imports-in-react-3e3e7ad1d210

vite의 [glob import API](https://vitejs.dev/guide/features.html#glob-import) 를 사용하여 glob 패턴으로 라우팅 규칙을 정의.

`import.meta.globEager`를 사용하여 동기방식으로 `src/pages` 폴더 내불에 있고 확장자가 `.tsx`인 컴포넌트들을 가져와 변수에 저장.

```ts
const COMPONENTS = import.meta.globEager('/src/pages/**/[a-z]*.tsx')
```

위 패턴은 파일이름이 소문자 a-z로 시작하거나 중괄호 `[`로 시작하여 확장자는 tsx인 파일을 모두 찾아 온다.

`.map`을 사용하여 `COMPONENTS`를 순회하며 경로와 컴포넌트 값으로 가지는 `components` 변수를 정의

```ts
const components = Object.keys(COMPONENTS).map((component) => {
  const path = component
    .replace(/\/src\/pages|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1')

  return { path, component: COMPONENTS[component].default }
})
```

위 규칙으로 정의한 `components` 변수의 값은 다음과 같이 정의될 수 있다.

```ts
components = [
  { path: "/", component: f App() },
  { path: "/user", component: f UserList() },
  { path: "/user/:id }, component: f UserDetail() }
]
```

그리고 마지막으로 `components` 변수를 순회하며 리액트 라우트를 정의하여 리턴하는 `Routes()` 컴포넌트를 생성

```tsx
export const Routes = () => {
  return (
    <App>
      <Switch>
        {components.map(({ path, component: Component = Fragment }) => (
          <Route key={path} path={path} component={Component} exact={true} />
        ))}
      </Switch>
    </App>
  )
}
```

### 404 정의하기">
