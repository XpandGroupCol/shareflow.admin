import { axiosFetcher } from './fetcher'

export const getPublishers = async (params) => {
  try {
    const { data } = await axiosFetcher(`/publishers${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getPublisherById = async (id) => {
  try {
    const { data } = await axiosFetcher(`/publishers/${id}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deletePublisher = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/publishers/${id}`,
      { method: 'DELETE', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const createPublisher = async (payload) => {
  try {
    const { data } = await axiosFetcher('/publishers',
      { method: 'POST', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getCSVPublishers = async (params) => {
  try {
    const { data } = await axiosFetcher(`/publishers/download${params}`,
      { method: 'GET', responseType: 'blob' }
    )
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.setAttribute('download', 'publishers.csv')
    link.href = url
    document.body.appendChild(link)
    link.click()
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const uploadPublisherfile = async (payload) => {
  try {
    const { data } = await axiosFetcher('/publishers/upload-file',
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const editPublisher = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/publishers/${id}`,
      { method: 'PUT', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
