import SecureLS from 'secure-ls'

const sLs = new SecureLS()

const jsonParse = (text) => {
  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

const get = (key) => {
  try {
    const store = window.localStorage.getItem(key)
    return store ? jsonParse(store) : undefined
  } catch (e) {
    return undefined
  }
}

const set = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    return undefined
  }
}

const clear = (key = null) => {
  try {
    if (key) { return window.localStorage.removeItem(key) }
    window.localStorage.clear()
  } catch (e) {
    return undefined
  }
}

const getSecure = (key) => {
  try {
    const store = sLs.get(key)
    return store ? jsonParse(store) : undefined
  } catch (e) {
    return undefined
  }
}

const setSecure = (key, value) => {
  try {
    const store = JSON.stringify(value)
    sLs.set(key, store)
  } catch (e) {
    return undefined
  }
}

const clearSecure = (key = null) => {
  try {
    if (key) { return sLs.remove(key) }

    sLs.removeAll()
  } catch (e) {
    return undefined
  }
}

export const Storage = {
  get,
  set,
  clear,
  getSecure,
  setSecure,
  clearSecure
}
