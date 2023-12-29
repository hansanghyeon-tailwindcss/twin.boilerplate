import { pipe, flow } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import * as R from 'fp-ts/Record'

// 경로에서 언어 코드를 추출하는 함수
const extractLanguageCode = (filePath: string): string => {
  const match = filePath.match(/\/locales\/(.+?)\/(ko|en)\.json/)
  return match ? match[2] : 'unknown'
}

const extractNamespace = (filePath: string): string => {
  const match = filePath.match(/\/locales\/(.+?)\/(ko|en)\.json/)
  return match ? match[1] : 'unknown'
}

// 주어진 경로들에서 언어(JSON) 데이터를 가져오고 가공하는 함수
const fetchAndProcessLanguageData = (fm: [string, Record<string, string>][]) =>
  pipe(
    fm,
    A.map(([filePath, data]) => ({
      namespace: extractNamespace(filePath),
      languageCode: extractLanguageCode(filePath),
      data,
    })),
    // { languageCode: { namespace: undefined, } }
    // 이런 형대로 만들어야한다.
    A.reduce({} as any, (acc, cur) => ({
      ...acc,
      [cur.languageCode]: {
        ...acc[cur.languageCode],
        [cur.namespace]: cur.data,
      },
    }))
  )

// locales/**/[en|ko].json en, ko만 가져와야한다
// 결과로 { **: { en: json 결과, ko: json 결과 } } 형태로 만들어야한다.
const resources_json = import.meta.glob('/locales/**/(ko|en).json', {
  as: 'raw',
  eager: true,
})
const getResources = pipe(
  resources_json,
  R.map((e) => JSON.parse(e) as Record<string, string>),
  R.toArray,
  // 파일의 키가 /locale/{namespace}/{languageCode}.json 형태인데
  // { languageCode: { namespace: undefined, } }
  // 이런 형대로 만들어야한다.\
  (e) => e,
  fetchAndProcessLanguageData
)
const resources = getResources

export default resources
