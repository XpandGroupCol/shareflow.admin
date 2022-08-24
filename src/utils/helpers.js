let timer
export const debounce = (callback, timeout = 500) => {
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(...args)
    }, timeout)
  }
}
