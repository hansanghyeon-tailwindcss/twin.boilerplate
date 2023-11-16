import { useContext } from 'react'
import {
  Link,
  useNavigate,
  type NavigateFunction,
  type LinkProps,
  type NavigateOptions,
} from 'react-router-dom'
import { LocaleContext } from '~/routing/lang-router.context'

/**
 * Link에 locale을 붙여주는 컴포넌트
 */
export const LocaleLink = ({ to, ...props }: LinkProps) => {
  const { locale } = useContext(LocaleContext)
  return (
    <Link to={`/${locale}${to}`} {...props}>
      {props.children}
    </Link>
  )
}
/**
 * LocaleLink - react-router-dom Link에 locale을 붙여주는 컴포넌트
 * LocaleLink의 alias
 */
export const LLink = LocaleLink

/**
 * 문자열로 path를 받으면 locale 경로를 포함시켜준다.
 * 기본동작은 react-router-dom의 useNavigate와 동일하다.
 */
export const useLocaleNav = (): NavigateFunction => {
  const { locale } = useContext(LocaleContext)

  const navigate = useNavigate()

  return (...args) => {
    // args 첫번째 인자가 number 타입이라면
    if (typeof args[0] === 'number') {
      navigate(args[0])
    }

    // args 첫번째 인자가 string 타입이라면
    if (typeof args[0] === 'string') {
      navigate(`/${locale}${args[0]}`)
    }

    // args 첫번째 인자가 object 타입이라면
    // args의 타입은 [Partial<Path>, NavigateOptions]이다.
    if (typeof args[0] === 'object') {
      const [path, options] = args
      navigate(path, options as NavigateOptions)
    }
  }
}
