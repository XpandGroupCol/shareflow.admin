import { REACT_ACCESS_TOKEN, REACT_REFRESH_TOKEN, REACT_TIME_TOKEN, SESSION_DATA } from 'configs/auth'
import { Storage } from 'utils/storage'
import { axiosFetcher } from './fetcher'

const updateToken = ({ token }) => {
  Storage.set(REACT_ACCESS_TOKEN, token)
  Storage.set(REACT_TIME_TOKEN, new Date().getTime())
}

export const logout = () => {
  Storage.clear()
  Storage.clearSecure()
  window.location.reload()
}

export const refreshToken = async (timer = 4000000) =>
  setTimeout(__refreshToken, timer)

const __refreshToken = async () => {
  try {
    const rfsToken = Storage.get(REACT_REFRESH_TOKEN)
    const { data } = await axiosFetcher('/auth/refresh-token',
      {
        method: 'POST',
        data: { token: rfsToken }
      },
      false
    )
    if (!data?.data) return logout()

    updateToken(data.data)
    refreshToken()
  } catch (error) {
    logout()
  }
}

export const getSession = () => {
  const accessToken = Storage.get(REACT_ACCESS_TOKEN)
  const storageRefreshToken = Storage.get(REACT_REFRESH_TOKEN)
  const sessionData = Storage.getSecure(SESSION_DATA)
  if (!(accessToken && storageRefreshToken && sessionData)) return false
  return sessionData
}

export const verifySession = async () => {
  const currentTime = new Date().getTime()
  const sessionTime = Storage.get(REACT_TIME_TOKEN) || 0

  if (currentTime - sessionTime > 7200000) return logout()
  if (!sessionTime || currentTime - sessionTime > 1800000) {
    await __refreshToken()
  }
  return getSession()
}

export const login = async (payload) => {
  try {
    const { data = {} } = await axiosFetcher('/auth',
      { method: 'POST', data: payload },
      false
    )

    const { data: user = {} } = data
    const { role, name, avatar, email } = user

    updateToken(user)
    Storage.set(REACT_REFRESH_TOKEN, user.refreshToken)
    Storage.setSecure(SESSION_DATA, { role, name, avatar, email })
    refreshToken()
    return user
  } catch (err) {
    return Promise.reject(err)
  }
}

export const forgotPassword = async (payload) => {
  try {
    const { data } = await axiosFetcher('/auth/forgot-password',
      { method: 'POST', data: payload },
      false
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const recoveryPassword = async (payload) => {
  try {
    const { data } = await axiosFetcher('/auth/validate-token',
      { method: 'POST', data: payload },
      false
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const changePassword = async (payload) => {
  try {
    const { data } = await axiosFetcher('/auth/change-password',
      { method: 'POST', data: payload },
      false
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
