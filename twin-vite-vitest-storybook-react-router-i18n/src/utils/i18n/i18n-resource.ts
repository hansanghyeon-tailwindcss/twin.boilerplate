import { type Resource } from 'i18next'
import { pipe, flow } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
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
        console.log(filePath)
        const jsonData = await import(/* @vite-ignore */filePath)
        return JSON.parse(JSON.stringify(jsonData)).default
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

export default resources