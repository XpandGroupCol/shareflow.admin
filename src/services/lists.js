import { axiosFetcher } from './fetcher'

export const getLists = async () => {
  const lists = [
    axiosFetcher('/lists/targets', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/ages', { method: 'GET' }).then(({ data }) => data?.data).catch(() => [])
  ]

  try {
    const [targets, ages] = await Promise.allSettled(lists)

    return ({
      targets: targets?.value || [],
      ages: ages?.value || []
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getLocations = async (search) => {
  try {
    const { data } = await axiosFetcher(`/lists/locations?search=${search}`,
      { method: 'GET' })
    return data
  } catch (err) {
    return []
  }
}

export const getSectors = async (search) => {
  try {
    const { data } = await axiosFetcher(`/lists/sectors?search=${search}`,
      { method: 'GET' })
    return data
  } catch (err) {
    return []
  }
}

export const getFormats = async (search) => {
  try {
    const { data } = await axiosFetcher(`/lists/formats?search=${search}`,
      { method: 'GET' })
    return data
  } catch (err) {
    return []
  }
}
