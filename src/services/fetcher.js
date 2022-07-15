import axios from 'axios'
import { BASE_URL } from 'configs'
import { REACT_ACCESS_TOKEN } from 'configs/auth'
import { Storage } from 'utils/storage'

export const axiosFetcher = (path, { token, headers = {}, ...arg }) => {
  const access = token ?? Storage.get(REACT_ACCESS_TOKEN)

  if (access) {
    arg.headers = {
      ...headers,
      Authorization: `Bearer ${access}`
    }
  }

  return axios({
    baseURL: BASE_URL,
    url: path,
    ...arg
  })
}
