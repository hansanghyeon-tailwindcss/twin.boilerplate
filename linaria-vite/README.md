[![Stackblitz](https://img.shields.io/badge/Stackblitz-fff?style=for-the-badge&logo=Stackblitz&logoColor=1389FD)](https://stackblitz.com/fork/github/hansanghyeon-boilerplate/linaria-vite)

[callstack/linaria: Zero-runtime CSS in JS library](https://github.com/callstack/linaria)

## WORKING

### 1. vite 셋팅

```bash
yarn create vite
🟥 SWC
```

### 2. vite에서 셋팅된 App.tsx cleanup

`App.tsx`에서 불필요한 코드들 삭제


### 3. `@linaria/core` 설치

```bash
yarn add @linaria/core
```

### 4. @linaria 서포트 라이브러리 

#### polished 설치 (linaria 공식문서 채용되어있는 라이브러리)

[polished | A lightweight toolset for writing styles in JavaScript](https://polished.js.org/)

```bash
yarn add polished
```

#### tailwind, twin.macro

[ben-rogerson/twin.macro: 🦹‍♂️ Twin blends the magic of Tailwind with the flexibility of css-in-js (emotion, styled-components, stitches and goober) at build time.](https://github.com/ben-rogerson/twin.macro)

```bash
yarn add twin.macro
```

### 5. `@linaria/react` 설치

react에서 styled-component 처럼 사용할 것이기 때문에 `@linaria/react` 설치

styled-component 사용하는 이유 **개발자 경험 향상**

```bash
yarn add @linaria/react
```

### 6. vite설정, @linaria 바벨설정하기

<img width="982" alt="스크린샷 2023-03-02 오후 5 24 12" src="https://user-images.githubusercontent.com/42893446/222373225-5bee480e-4662-43de-a315-441b810dee4a.png">

```bash
yarn add -D @linaria/vite
```

```bash
yarn add -D @babel/preset-typescript @babel/preset-react
```

```bash
# vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
})
```

WOW!!

<img width="489" alt="스크린샷 2023-03-02 오후 5 27 32" src="https://user-images.githubusercontent.com/42893446/222373213-4dae9842-a381-4171-907e-dc01647a1a12.png">

7. css속성, styled속성에서 구성요소 지정해서 사용하기

[callstack/linaria: Zero-runtime CSS in JS library](https://github.com/callstack/linaria#interoperability-with-other-css-in-js-libraries)

<img width="1002" alt="스크린샷 2023-03-02 오후 5 33 16" src="https://user-images.githubusercontent.com/42893446/222374448-c7bff37c-27bf-4507-a967-cae9a8ccd7ac.png">

WHY?!!?!?!

```bash
🟥 yarn add -D @linaria/babel-plugin-interop
```

설치하지 않는다.

