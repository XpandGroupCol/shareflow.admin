import { axiosFetcher } from './fetcher'

export const getProfile = async () => {
  try {
    const { data } = await axiosFetcher('/users/me',
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateProfile = async (payload) => {
  try {
    const { data } = await axiosFetcher('/users/me',
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const changeProfilePassword = async (payload) => {
  try {
    const { data } = await axiosFetcher('/users/change-password',
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
