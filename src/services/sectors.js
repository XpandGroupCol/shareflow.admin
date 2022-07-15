import { axiosFetcher } from './fetcher'

export const getSectors = async (params) => {
  try {
    const { data } = await axiosFetcher(`/sectors${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const createSector = async (payload) => {
  try {
    const { data } = await axiosFetcher('/sectors',
      { method: 'POST', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateSector = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/sectors/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteSector = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/sectors/${id}`,
      { method: 'DELETE', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getCSVSector = async (params) => {
  try {
    const { data } = await axiosFetcher(`/sectors/download${params}`,
      { method: 'GET', responseType: 'blob' }
    )
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.setAttribute('download', 'sectors.csv')
    link.href = url
    document.body.appendChild(link)
    link.click()
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
