import { I18nextProvider } from 'react-i18next'
import React, { PropsWithChildren } from 'react'
import { overrideI18n } from '../utils/i18next'

interface WithI18nextProps extends PropsWithChildren {
  locale: string
  resources?: [string, string, Record<string, unknown>][]
}
export const TemplateI18nextProvider = ({
  children,
  locale,
  resources,
}: WithI18nextProps) => {
  React.useEffect(() => {
    if (resources) {
      // eslint-disable-next-line array-callback-return
      resources.map(([lng, ns, resource]) => {
        overrideI18n.addResourceBundle(lng, ns, resource)
      })
      overrideI18n.reloadResources(locale)
    }
  }, [resources, locale])
  // When the locale global changes
  // Set the new locale in i18n
  React.useEffect(() => {
    overrideI18n.changeLanguage(locale)
  }, [locale])

  return <I18nextProvider i18n={overrideI18n}>{children}</I18nextProvider>
}
