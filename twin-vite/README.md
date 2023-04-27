[![Stackblitz](https://img.shields.io/badge/Stackblitz-fff?style=for-the-badge&logo=Stackblitz&logoColor=1389FD)](https://stackblitz.com/fork/github/hansanghyeon-boilerplate/twin.macro-vite)


vite에서 twin.macro를 사용하기 위해서는 `babel-plugin-twin` `babel-plugin-macros`가 필요하다.

`@emotion/styled` `@emtoion/react`를 사용하는데 위 babel 플러그인 두가지만 설정하면 `<div css="..." data-tw=""/>` 이런식으로 나오게된다. css속성은 `@emotion`의 기능이기 때문에

typescript 설정에서 jsxImportSource를 `@emotion/react`로 설정해줘야한다.

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
```

## 🤔

### 많은 수의 endpoint를 가져야할떄

- https://stackoverflow.com/questions/70522494/multiple-entry-points-in-vite



## 참고자료

- https://github.com/ben-rogerson/babel-plugin-twin/issues/9#issuecomment-1318545946
- https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react


## TIP

스크립트에서 css를 import해올때 build되는 결과물에 css로 나오게된다. 사용하는 특성상 css로 분리하 않아야하는 곳에 사용하면 매우 좋습니다.

```js
# vite.config.[ts,js]
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      plugins: [
        cssInjectedByJsPlugin(),
      ]
    }
  },
});
```
