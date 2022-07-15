import { axiosFetcher } from './fetcher'

export const getCampaigns = async (params) => {
  try {
    const { data } = await axiosFetcher(`/campaigns${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteCampaign = async ({ id, payload }) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/${id}`,
      { method: 'DELETE', data: payload }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getCSVCampaign = async (params) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/download${params}`,
      { method: 'GET', responseType: 'blob' }
    )
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.setAttribute('download', 'campaigns.csv')
    link.href = url
    document.body.appendChild(link)
    link.click()
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
