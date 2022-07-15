import { axiosFetcher } from './fetcher'

export const getInvitation = async (params) => {
  try {
    const { data } = await axiosFetcher(`/invitation${params}`,
      { method: 'GET' }
    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getCSVInvitations = async (params) => {
  try {
    const { data } = await axiosFetcher(`/invitation/download${params}`,
      { method: 'GET', responseType: 'blob' }
    )
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.setAttribute('download', 'invitation.csv')
    link.href = url
    document.body.appendChild(link)
    link.click()
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

export const sendEmail = async (id) => {
  try {
    const { data } = await axiosFetcher('/invitation/send-email',
      { method: 'POST', data: { id } }

    )
    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
