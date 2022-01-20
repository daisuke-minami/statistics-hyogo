import { reactive, toRefs } from '@nuxtjs/composition-api'
import qs from 'qs'

export const useEstatApi = (axios, params) => {
  const state = reactive<baseState>({
    response: {},
    otherError: null,
    isLoading: false,
  })
  // const { $axios } = useContext()
  const getData = async () => {
    const url = 'getStatsData'

    const api = axios.create({
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
      // mode: 'cors',
      withCredentials: true,
      data: {},
    })
    api.setBaseURL(`${process.env.BASE_URL}/json/`)

    state.isLoading = true

    const res = await api.$get(url, { params })
    return res
  }

  return {
    ...toRefs(state),
    getData,
  }
}
