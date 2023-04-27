## Developing

개발시작하기 run :

```
yarn dev
```

이렇게 하면 라이브러리 버전이 빌드되고 감시자가 실행되며 Storybook 실행됩니다.
Storybook을 열려면 브라우저를 수동으로 열고 [http://localhost:6060](http://localhost:6060)으로 이동합니다.
`src/components` 폴더에서 컴포넌트 개발을 시작하고 그에 따라 `src/index.js` 파일을 업데이트하십시오.
항상 `YourComponent.story.tsx` 파일을 제공하여 구성 요소가 Storybook에 표시되도록 합니다.

'Button' 구성 요소의 예를 참조할 수 있지만 아이디어를 얻을 수 있을 것입니다.

### Proposals (Babel)

원활한 개발을 위해 일부 Babel 플러그인이 포함되어 있습니다.
- [class-properties](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-class-properties)
- [object-rest-spread](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-object-rest-spread)
- [optional-chaining](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-optional-chaining)
- [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros)

## Styling your components

`SCSS`와 `CSS`는 기본적으로 지원되며 평소처럼 스타일을 구성요소로 가져오기만 하면 됩니다.
`CSS Module`의 사용은 다음 플러그인을 참고하십시오 [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss)

하지만 위 보일러플에이트에서는 `twin.macro`와 `tailwindcss`를 기본값으로 사용하도록 구성됩니다.

## Testing

테스트는 [Jest](https://facebook.github.io/jest/) 및 [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)로 수행됩니다. /)
`Button.test.js`를 예로 들 수 있습니다.

```
yarn test
```

or (for getting coverage)

```
yarn test:coverage
```


## Linting

Linting은 [ESLint](https://eslint.org/)를 통해 설정되고 [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)으로 구성됩니다. 그리고 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier).
`.eslintrc.json` 파일에서 lint 규칙을 재정의하여 수정할 수 있습니다.

```
yarn lint
```
or (if automatic fixing is possible)
```
yarn lint:fix
```

## Publishing your library to NPM

라이브러리를 NPM 또는 개인 레지스트리에 릴리스하려면 [NPM](https://www.npmjs.com/)에 활성 계정이 있고 `.npmrc` 파일이 올바르게 설정되어 있고 ` 저장소 URL이 ` package.json` 파일이 저장소 URL로 설정되면:

```
yarn release
```

## Storybook

Storybook에 대한 커스텀 레이아웃, 스타일링, 자세한 내용은 [Storybook](https://storybook.js.org/basics/writing-stories/) 문서를 참고하세요.

#### Deploy Storybook to GitHub Pages

`package.json` 파일의 저장소 URL이 저장소 URL로 설정되어 있는지 확인한 다음:

```
yarn deploy
```

## Scripts

- `yarn start` : Only serves Storybook.
- `yarn build` : Builds your library (build can be found in `dist` folder).
- `yarn storybook:build` : Builds the static Storybook in case you want to deploy it.
- `yarn test` : Runs the tests.
- `yarn test:coverage`: Runs the test and shows the coverage.
- `yarn lint` : Runs the linter, Typescript typecheck and stylelint.
- `yarn lint:fix` : Runs the linter, Typescript typecheck and stylelint and fixes automatic fixable issues.
- `yarn eslint`: Runs only the JavaScript linter.
- `yarn eslint:fix`: Runs only the JavaScript linter and fixes automatic fixable issues.
- `yarn stylelint`: Runs only the style linter.
- `yarn stylelint:fix`: Runs only the style linter and fixes automatic fixable issues.
- `yarn check-types`: Runs typescript type checker.
- `yarn release` : Publishes your Library on NPM or your private Registry (depending on your config in your `.npmrc` file).
- `yarn deploy`: Deploys the Styleguide to GitHub Pages.


## Resources

### Bundler
- [Rollup.js](https://rollupjs.org/guide/en)

### Code Formatter
- [Prettier](https://prettier.io/)

### Storybook
- [Storybook](https://storybook.js.org/)

### Testing
- [Jest](https://facebook.github.io/jest/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)

### Linting
- [ESLint](https://eslint.org/)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
- [stylelint-prettier](https://github.com/prettier/stylelint-prettier)
- [stylelint-scss](https://github.com/kristerkari/stylelint-scss)
### Compiler
- [Babel 7](https://babeljs.io/)
- [Typescript](https://www.typescriptlang.org/)
