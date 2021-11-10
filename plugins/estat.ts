import axios from 'axios'
// import { filter } from 'vue/types/umd'

type EstatParam = {
  statsDataId: string
  cdArea: string | null
  cdCat01: string | null
  cdCat02: string | null
  cdTab: string | null
}

/** estat-APIからデータを取得
 * @param statsDataId - 統計表ID
 * @param cdArea - 都道府県コード or 市区町村コード（5桁）
 * @param cdCat01 - カテゴリコード
 */
const getEstatAPI = async (estatParam: EstatParam) => {
  const statsDataId = estatParam.statsDataId
  let url = `${process.env.BASE_URL}/json/getStatsData?appId=${process.env.ESTAT_APPID}&statsDataId=${statsDataId}`
  if (estatParam.cdArea) {
    url = url + `&cdArea=${estatParam.cdArea}`
  }
  if (estatParam.cdCat01) {
    url = url + `&cdCat01=${estatParam.cdCat01}`
  }
  // console.log(url)
  const res = await axios.get(url, {
    mode: 'cors',
    withCredentials: true,
    data: {},
  })
  return res.data
}

type EstatData = {
  statName: string
  statUrl: string
  classInfo: object
  value: [
    {
      id: string
      cat01: string[] | null
      area: string[]
      time: string[]
      unit: string[]
      $: string
    }
  ]
}

// 共通関数として利用する
export default (_, inject) => {
  inject('getEstatAPI', getEstatAPI)
}
