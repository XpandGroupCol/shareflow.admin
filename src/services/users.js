import { axiosFetcher } from './fetcher'

export const getUsers = async (params) => {
  try {
    const { data } = await axiosFetcher(`/users${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getUserById = async (id) => {
  try {
    const { data } = await axiosFetcher(`/users/${id}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const createUser = async (payload) => {
  try {
    const { data } = await axiosFetcher('/users',
      { method: 'POST', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteUser = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/users/${id}`,
      { method: 'DELETE', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getCSVUsers = async (params) => {
  try {
    const { data } = await axiosFetcher(`/users/download${params}`,
      { method: 'GET', responseType: 'blob' }
    )
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.setAttribute('download', 'users.csv')
    link.href = url
    document.body.appendChild(link)
    link.click()
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const uploadUserfile = async (payload) => {
  try {
    const { data } = await axiosFetcher('/users/upload-file',
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const editUser = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/users/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
