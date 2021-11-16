import qs from 'qs'

export type EstatParams = {
  statsDataId: string
  cdArea: string[] | null | undefined
  cdCat01: string[] | null | undefined
  cdCat02: string[] | null | undefined
  cdTab: string[] | null | undefined
}

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
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'comma' })
    },
    mode: 'cors',
    withCredentials: true,
    data: {},
  })

  api.setBaseURL(`${process.env.BASE_URL}/json/getStatsData`)

  // api.onRequest((config) => {
  //   // console.log('URL ' + config.url)
  // })

  inject('estat', api)
}
