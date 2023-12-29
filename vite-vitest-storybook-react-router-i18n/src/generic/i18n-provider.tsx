import { I18nextProvider } from 'react-i18next'
import React, { PropsWithChildren } from 'react'
import { overrideI18n } from '~/utils/i18n'

interface WithI18nextProps extends PropsWithChildren {
  locale?: string
}
export const AppI18nextProvider = ({
  children,
  locale,
}: WithI18nextProps) => {
  // When the locale global changes
  // Set the new locale in i18n
  React.useEffect(() => {
    overrideI18n.changeLanguage(locale)
  }, [locale])

  return <I18nextProvider i18n={overrideI18n}>{children}</I18nextProvider>
}
