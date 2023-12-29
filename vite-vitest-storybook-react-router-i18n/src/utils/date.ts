/* eslint-disable import/no-duplicates */
import { Locale } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { ko, enUS } from 'date-fns/locale'
import { useContext } from 'react'
import { LocaleContext } from 'routing/lang-router'

type DateType = number | Date
const locales: Record<string, Locale> = { ko, enUS }
// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
// format에 들어오는 date 값은 모두 UTC+0 기준이다.
export const format = (date: DateType, formatStr = 'PP') => {
  const { locale } = useContext(LocaleContext)

  return formatInTimeZone(
    date,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    formatStr,
    {
      locale: locales[locale],
    },
  )
}
