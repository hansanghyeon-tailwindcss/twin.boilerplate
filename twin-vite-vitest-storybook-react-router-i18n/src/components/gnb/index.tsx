import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import { LLink } from "~/utils/i18n";

const GNB = () => {
  return (
    <div tw="flex gap-x-[1em]">
      {pipe(
        import.meta.glob('/src/pages/**/[a-z[]*.tsx'),
        Object.keys,
        A.mapWithIndex((i, e) => {
          const path = e.replace(/\/src\/pages|index|\.tsx$/g, '').replace(/\[\.{3}.+\]/, '*').replace(/\[(.+)\]/, ':$1')
          return <div key={`nav-${i}`} tw="px-[10px] py-[4px] rounded-[4px] dark:bg-gray-900"><LLink to={path} tw="dark:text-white">{path}</LLink></div>
        }),
      )}
    </div>
  )
}

export default GNB