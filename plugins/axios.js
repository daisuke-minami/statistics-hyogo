import https from 'https'

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.httpsAgent = new https.Agent({ keepAlive: true })
  })

  $axios.defaults.timeout = 5 * 60 * 1000
  $axios.defaults.withCredentials = true

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
