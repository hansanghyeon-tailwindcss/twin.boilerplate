import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation, initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import resources from './i18n-resource';
import { extendsFormatter } from './i18n-format'
import LocalStorageManager from 'managers/local-storage-manger';
import { LocalStorageKeys } from 'constants/constants';

const isDev = import.meta.env.MODE === 'development'

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'customLocalStorageDetector',

  lookup() {
    return LocalStorageManager.getItem(LocalStorageKeys.I18_NEXT_LNG);
  },
});

i18n
  .use(languageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    supportedLngs: ['ko', 'en'],
    fallbackLng: 'ko',
    debug: true, //isDev,
    lng: 'ko',
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    resources,
    detection: {
      order: ['customLocalStorageDetector', 'navigator'],
      caches: [],
    },
    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: false,
    },
  })

extendsFormatter(i18n)

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
