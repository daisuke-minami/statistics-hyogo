export default function ({ $axios, $config }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
      'X-API-KEY': $config.RESAS_API_KEY,
      'Content-Type': 'application/json',
    },
    data: {},
  })

  api.setBaseURL('https://opendata.resas-portal.go.jp')

  inject('resas', api)
}
