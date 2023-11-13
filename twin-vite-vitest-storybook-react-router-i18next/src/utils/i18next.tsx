import { useTranslation } from 'react-i18next'
import i18n, { type Resource } from 'i18next'
import * as S from 'fp-ts/string'
import { pipe, flow } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either'

// 경로에서 언어 코드를 추출하는 함수
const extractLanguageCode = (filePath: string): string => {
  const match = filePath.match(/\/locales\/(.+?)\/(ko|en)\.json/);
  return match ? match[2] : 'unknown';
};

const extractNamespace = (filePath: string): string => {
  const match = filePath.match(/\/locales\/(.+?)\/(ko|en)\.json/);
  return match ? match[1] : 'unknown';
};

// 각 언어의 JSON 파일을 가져오는 함수
const fetchLanguageJson = (filePath: string) =>
  pipe(
    TE.tryCatch(
      async () => {
        const jsonData = await import(filePath);
        return JSON.parse(JSON.stringify(jsonData)).default;
      },
      (error) => `Error fetching data from ${filePath}: ${String(error)}`
    ),
    TE.fromTask
  );

// 주어진 경로들에서 언어(JSON) 데이터를 가져오고 가공하는 함수
const fetchAndProcessLanguageData = (filePaths: string[]) =>
  pipe(
    filePaths,
    TE.traverseArray((filePath) =>
      pipe(
        fetchLanguageJson(filePath),
        TE.map((data) => ({
          namespace: extractNamespace(filePath),
          languageCode: extractLanguageCode(filePath),
          data,
        }))
      )
    ),
    TE.map(
      flow(
        results => results.reduce((acc, { namespace, languageCode, data }) => {
          acc[languageCode] = acc[languageCode] || {};
          acc[languageCode][namespace] = pipe(
            data,
            E.fold(
              (error) => {
                console.error(error);
                return acc;
              },
              (data) => data
            )
          )
          return acc;
        }, {} as Record<string, Record<string, unknown>>),
      )
    ),
  );


// locales/**/[en|ko].json en, ko만 가져와야한다
// 결과로 { **: { en: json 결과, ko: json 결과 } } 형태로 만들어야한다.
const resources_json = import.meta.glob('/locales/**/(ko|en).json') as Record<string, () => Promise<Record<string, string>>>
const getResources = pipe(
  resources_json,
  Object.keys,
  fetchAndProcessLanguageData,
  TE.match(
    (error) => {
      console.error(error);
    },
    (data) => data
  ),
)
const resources = await getResources().then((data) => data) as Resource
console.log(resources)
const isDev = import.meta.env.MODE === 'development'

i18n.init({
  fallbackLng: 'en',
  debug: true, //isDev,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  resources,
})

// ko.json
// "{{test}}": "테스트"
// "{{test}}": "{{test, symbol}} 테스트"
//
// __('{{test}}', { test: 'test', form: { currency: 'KRW' } }) -> 테스트 테스트
i18n.services.formatter?.add('currency', (value, lng, options) => {
  // 기본값을 currency로 설정한다.
  if (!options?.style) {
    // eslint-disable-next-line no-param-reassign
    options.style = 'currency'
  }
  if (options?.removeCountry && options?.currencyDisplay === 'name') {
    const getCurrencyName = new Intl.NumberFormat(lng, options).format(value)
    const result = getCurrencyName.split(' ')

    // 기본 template
    const template = options?.template || '{{currency}}'
    return pipe(template, S.replace('{{currency}}', result.slice(-1)[0]))
  }
  return new Intl.NumberFormat(lng, options).format(value)
})

// i18n에 currency 포맷터를 덮어씌운다.
// 기존 기능은 모두 가져오고 원하는 기능만 덮어씌운다.
i18n.services.formatter?.add('price', (value, lng, options) => {
  const overrideOptions = { ...options }
  // 기본값을 currency로 설정한다.
  if (!overrideOptions?.style) {
    overrideOptions.style = 'currency'
  }

  // 대한민국 통화 커스텀 포맷터
  // Javascript의 기본 Intl.NumberFormat에서 name의 값은 `대한민국 원`으로만 지원한다.
  // 하지만우리는 `1,000 원`을 원한다.
  // 모든 나라 화폐에 대해서 동일하게 화페 단위만 가져올 것이다.
  // - 대한민국 원
  // - 미국 달러
  // - 유로
  // - 일본 엔화
  if (
    overrideOptions?.removeCountry &&
    overrideOptions?.currencyDisplay === 'name'
  ) {
    const getCurrencyName = new Intl.NumberFormat(lng, overrideOptions).format(
      value
    )
    const result = getCurrencyName.split(' ')
    // 가격제거
    const price = result.shift()

    // 기본 template
    const template = overrideOptions?.template || '{{amount}} {{currency}}'
    return pipe(
      template,
      S.replace('{{amount}}', String(price)),
      S.replace('{{currency}}', result.slice(-1)[0])
    )
  }
  return new Intl.NumberFormat(lng, overrideOptions).format(value)
})

/**
 * 네임스페이스가 기본으로 포함한 useTranslation을 리턴한다.
 */
export const useTemplateTranslation = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { t, i18n: _i18n } = useTranslation(undefined, { i18n })
  return {
    // TODO: 정확한 타입을 리턴해야한다.
    __: (key: string, options?: Record<string, any>) => t(key, options),
    i18n: _i18n,
  }
}

/**
 * useTemplateTranslation의 별칭함수이다.
 */
export const useTT = useTemplateTranslation
export const overrideI18n = i18n
