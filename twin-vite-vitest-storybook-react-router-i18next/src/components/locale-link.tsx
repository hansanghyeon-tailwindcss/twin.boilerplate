import { useContext } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { LocaleContext } from 'routing/lang-router'

/**
 * Link에 locale을 붙여주는 컴포넌트
 */
const LLink = ({to, ...props}: LinkProps) => {
  const { locale } = useContext(LocaleContext)
  return (
    <Link to={`/${locale}${to}`} {...props}>
      {props.children}
    </Link>
  )
}

export default LLink