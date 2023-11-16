[![Stackblitz](https://img.shields.io/badge/Stackblitz-fff?style=for-the-badge&logo=Stackblitz&logoColor=1389FD)](https://stackblitz.com/fork/github/hansanghyeon/boilerplate/twin.macro-vite-vitest-storybook-react-router-i18n)

```sh
npx degit https://github.com/hansanghyeon/boilerplate/twin-vite-vitest-storybook-react-router-i18n example-project
```

이 저장소는 [hansanghyeon/boilerplate/twin-vite-vitest-storybook-react-router](https://github.com/hansanghyeon/boilerplate/twin-vite-vitest-storybook-react-router) 기반으로 국제화를 추가하였다.

추가된 사항

```bash
npx sb@next init --builder vite
```

## TL;DR

```jsx
import { useTT } from '~/utils/i18n'
import { format } from '~/utils/date'

const App = () => {
  const { __ } = useTT()
  return <div>{__('안녕하세요')} {format(new Date()}</div>
}
```

## i18next parser

### 리소스 사용

리소스는 `locales/{namespace}/{language}.json`를 가져와서 사용한다

### 리소스 만들기

`i18n`스크립트로 `locales/translation/dev.json`를 만들어준다.

`__()` 별칭훅을 만들어서 사용했다. 그래서 파싱하는 룰또한 달라져야해서 i18next parser를 직접 만들었다.
