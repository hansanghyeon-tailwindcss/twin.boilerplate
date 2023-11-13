import i18n from 'i18next'
import * as S from 'fp-ts/string'
import { pipe, flow } from 'fp-ts/function'

/**
 * 커스텀 포맷터를 추가한다.
 * currency, price
 */
export const extendsFormatter = (_i18n: typeof i18n) => {
  // ko.json
  // "{{test}}": "테스트"
  // "{{test}}": "{{test, symbol}} 테스트"
  //
  // __('{{test}}', { test: 'test', form: { currency: 'KRW' } }) -> 테스트 테스트
  _i18n.services.formatter?.add('currency', (value, lng, options) => {
    // 기본값을 currency로 설정한다.
    if (!options?.style) {
      // eslint-disable-next-line no-param-reassign
      options.style = 'currency'
    }
    if (options?.removeCountry && options?.currencyDisplay === 'name') {
      const getCurrencyName = new Intl.NumberFormat(lng, options).format(value)
      const result = getCurrencyName.split(' ')
  
      // 기본 template
      const template = options?.template || '{{currency}}'
      return pipe(template, S.replace('{{currency}}', result.slice(-1)[0]))
    }
    return new Intl.NumberFormat(lng, options).format(value)
  })
  
  // i18n에 currency 포맷터를 덮어씌운다.
  // 기존 기능은 모두 가져오고 원하는 기능만 덮어씌운다.
  _i18n.services.formatter?.add('price', (value, lng, options) => {
    const overrideOptions = { ...options }
    // 기본값을 currency로 설정한다.
    if (!overrideOptions?.style) {
      overrideOptions.style = 'currency'
    }
  
    // 대한민국 통화 커스텀 포맷터
    // Javascript의 기본 Intl.NumberFormat에서 name의 값은 `대한민국 원`으로만 지원한다.
    // 하지만우리는 `1,000 원`을 원한다.
    // 모든 나라 화폐에 대해서 동일하게 화페 단위만 가져올 것이다.
    // - 대한민국 원
    // - 미국 달러
    // - 유로
    // - 일본 엔화
    if (
      overrideOptions?.removeCountry &&
      overrideOptions?.currencyDisplay === 'name'
    ) {
      const getCurrencyName = new Intl.NumberFormat(lng, overrideOptions).format(
        value
      )
      const result = getCurrencyName.split(' ')
      // 가격제거
      const price = result.shift()
  
      // 기본 template
      const template = overrideOptions?.template || '{{amount}} {{currency}}'
      return pipe(
        template,
        S.replace('{{amount}}', String(price)),
        S.replace('{{currency}}', result.slice(-1)[0])
      )
    }
    return new Intl.NumberFormat(lng, overrideOptions).format(value)
  })
}
