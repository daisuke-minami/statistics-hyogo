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
  let url = `${process.env.ESTAT_API}/json/getStatsData?appId=${process.env.ESTAT_APPID}&statsDataId=${statsDataId}`
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

/** estatのレスポンスを整形する関数
 * @param response - estat=APIの取得結果
 */
const formatEstatData = (response: object, cdArea): EstatData => {
  // 統計タイトル等
  const TABLE_INF = response.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  const statName = `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`
  const statUrl = `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`

  // カテゴリ等の情報
  const CLASS_OBJ = response.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ
  const classInfo = CLASS_OBJ.map((item) => {
    return {
      id: item['@id'],
      data: item.CLASS,
    }
  })

  // データ
  // RankChartの場合、cdAreaはnull
  let value = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  if (cdArea) {
    value = value.filter((d) => d['@area'] === cdArea)
  }

  const times = Array.from(new Set(value.map((d) => d['@time']))).map((d) => {
    // console.log(d)
    return {
      yearInt: parseInt(d.substr(0, 4)),
      yearStr: d,
      yearName: `${d.substr(0, 4)}年`,
    }
  })

  const latestYearInt = times[times.length - 1].yearInt

  return { statName, statUrl, classInfo, value, times, latestYearInt }
}

/** estat-APIの取得結果をestatTableにフォーマット
 * @param estatJson - estat-APIの取得結果
 */
const formatEstatDataToTable = async (contents: object) => {
  const cdArea = contents.params.cdArea
  const contentsId = contents.contentsId
  const governmentType = contents.governmentType
  const titleId = contents.titleId

  // estatAPIのレスポンス取得（ローカルJSON）
  // 特定のcdAreaでfilterが必要
  const resAll = await import(
    `~/static/pagecontents/${contentsId}/${governmentType}/${titleId}.json`
  )
  const resValue = resAll.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE.filter(
    (d) => d['@area'] === cdArea
  )

  // カテゴリの取得（cdCat01、cdCat02、cdTabのみ）
  const categories =
    resAll.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ.filter(
      (f) => f.id !== 'area'
    ).map((item) => {
      return {
        id: item['@id'],
        data: item.CLASS,
      }
    })

  const tableHeaders = [
    { text: '統計項目名', value: 'titleId', width: '80px' },
    { text: '統計値', value: 'value', width: '50px', align: 'end' },
    { text: '単位', value: 'unit', width: '50px', align: 'center' },
    { text: '調査年次', value: 'year', width: '30px', align: 'end' },
  ]

  return { tableHeaders, resValue, categories }
}

// 共通関数として利用する
export default (_, inject) => {
  inject('getEstatAPI', getEstatAPI)
  inject('formatEstatDataToTable', formatEstatDataToTable)
  inject('formatEstatData', formatEstatData)
}
