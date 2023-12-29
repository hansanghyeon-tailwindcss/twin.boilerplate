import { createContext } from 'react'

export const LocaleContext = createContext({
  locale: '',
  setLocale: (_: string) => {},
})
