import React from 'react'
import { useTT } from 'utils/i18next'

const I18next = () => {
  const { __ } = useTT()
  return (
    <div>{__('안녕하세요')}</div>
  )
}

export default I18next