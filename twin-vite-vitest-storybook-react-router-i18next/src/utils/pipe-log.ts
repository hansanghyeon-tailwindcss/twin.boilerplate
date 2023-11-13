export function pipeLog(y?: any): <T>(x: T) => T {
  return (x) => {
    console.group('pipeLog')
    console.log(x)
    if (y !== undefined) {
      console.log('추가디버깅: ', y)
    }
    console.groupEnd()
    return x
  }
}
