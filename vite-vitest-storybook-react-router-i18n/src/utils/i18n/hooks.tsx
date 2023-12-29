import { useTranslation } from "react-i18next"
import { overrideI18n } from "./init"

/**
 * 네임스페이스가 기본으로 포함한 useTranslation을 리턴한다.
 */
export const useTemplateTranslation = () => {
  const { t, i18n } = useTranslation(undefined, { i18n: overrideI18n })
  return {
    // TODO: 정확한 타입을 리턴해야한다.
    __: (key: string, options?: Record<string, any>) => t(key, options),
    i18n,
  }
}

/**
 * useTemplateTranslation의 별칭함수이다.
 */
export const useTT = useTemplateTranslation
