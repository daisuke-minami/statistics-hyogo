import axios from 'axios'

/** resas-APIからデータを取得
 * @param resasURL - APIのURL
 * @param prefCode - 都道府県コード
 * @param cityCode - 市区町村コード
 */
const getResasAPI = async (resasURL, resasParam) => {
  const baseURL = 'https://opendata.resas-portal.go.jp/'
  const url =
    `${baseURL}${resasURL}?` +
    Object.entries(resasParam)
      .map((e) => `${e[0]}=${e[1]}`)
      .join('&')
  // console.log(url)
  const res = await axios.get(url, {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
    data: {},
  })
  // console.log(res)
  return res.data.result
}

/** resasのchartConfigを設定（Timechart用）
 * @param title - 統計タイトル
 * @param cdArea - 都道府県コード or 市区町村コード（5桁）
 */
const getResasChartConfig = (titleId, cdArea, isPref) => {
  const contents = process.env.Contents.find((d) => d.titleId === titleId)

  const Name = () => {
    if (isPref) {
      return process.env.prefList.find(
        (d) => `${('00' + d.prefCode).slice(-2)}000` === cdArea
      ).prefName
    } else {
      return process.env.cityList.find((d) => d.cityCode === cdArea).cityName
    }
  }

  return {
    class: contents.class,
    title: contents.title,
    graphTitle: `${Name()}の${contents.title}`,
    routes: `${contents.titleId} / ${cdArea} / time`,
    cdArea,
    cdName: Name(),
    apiURL: contents.apiURL,
    docURL: `https://opendata.resas-portal.go.jp/docs/${contents.apiURL}.html`,
    unit: contents.unit,
  }
}

// 共通関数として利用する
export default (_, inject) => {
  inject('getResasAPI', getResasAPI)
  inject('getResasChartConfig', getResasChartConfig)
}
