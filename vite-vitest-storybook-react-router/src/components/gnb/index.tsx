import { Link } from "react-router-dom";
import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'

const GNB = () => {
  return (
    <div>
      {pipe(
        import.meta.glob('/src/pages/**/[a-z[]*.tsx'),
        Object.keys,
        A.mapWithIndex((i, e) => {
          const path = e.replace(/\/src\/pages|index|\.tsx$/g, '').replace(/\[\.{3}.+\]/, '*').replace(/\[(.+)\]/, ':$1')
          return <li key={`nav-${i}`}><Link to={path}>{path}</Link></li>
        }),
      )}
    </div>
  )
}

export default GNB