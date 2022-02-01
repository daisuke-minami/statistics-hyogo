import { reactive, toRefs } from '@nuxtjs/composition-api'
import { ResasParams } from '~/types/resas'
// import qs from 'qs'

export const useResasApi = (axios) => {
  const state = reactive<baseState>({
    response: {},
    otherError: null,
    isLoading: false,
  })

  const getData = async (url: string, params: ResasParams) => {
    const resasApi = axios.create({
      headers: {
        common: {
          Accept: 'application/json',
        },
        'X-API-KEY': process.env.API_KEY,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      withCredentials: true,
      data: {},
    })
    resasApi.setBaseURL(`${process.env.BASE_URL}/api/`)

    state.isLoading = true

    const res = await resasApi.$get(url, { params })

    return res
  }

  return {
    ...toRefs(state),
    getData,
  }
}
