import React from 'react'
import { useTT } from 'utils/i18n'

const I18next = () => {
  const { __ } = useTT()
  return (
    <ul tw="text-left">
      <li>{__('안녕하세요')}</li>
      <li>
        {__('{{price}}', {
          price: 10000000,
          formatParams: {
            price: {
              currency: 'KRW',
              currencyDisplay: 'name',
              removeCountry: true,
            },
          },
        })}
      </li>
    </ul>
  )
}

export default I18next