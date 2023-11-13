import React from 'react'
import { format } from 'utils/date'

const DatePage = () => {
  return (
    <div>{format(new Date('2023-11-13'))}</div>
  )
}

export default DatePage