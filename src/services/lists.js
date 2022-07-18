import { axiosFetcher } from './fetcher'

export const getLists = async () => {
  const lists = [
    axiosFetcher('/lists/targets', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/formats', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/ages', { method: 'GET' }).then(({ data }) => data?.data).catch(() => []),
    axiosFetcher('/lists/sectors', { method: 'GET' }).then(({ data }) => data?.data).catch(() => [])
  ]

  try {
    const [targets, formats, ages, sectors] = await Promise.allSettled(lists)

    return ({
      formats: formats?.value || [],
      targets: targets?.value || [],
      ages: ages?.value || [],
      sectors: sectors?.value || []
    })
  } catch (err) {
    return Promise.reject(err)
  }
}
