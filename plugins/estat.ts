import qs from 'qs'

import { EstatParams } from '~/utils/formatEstat'

export default function ({ $axios }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
      'Content-Type': 'application/json',
    },
    params: {
      appId: process.env.ESTAT_APPID,
    },
    paramsSerializer: (params: EstatParams) => {
      return qs.stringify(params, { arrayFormat: 'comma' })
    },
    // mode: 'cors',
    withCredentials: true,
    data: {},
  })

  api.setBaseURL(`${process.env.BASE_URL}/json/`)
  api.onRequest((config) => {
    /* eslint-disable no-console */
    console.log('Making request to ' + config.url)
    console.log(config.baseURL)
  })

  inject('estat', api)
}
