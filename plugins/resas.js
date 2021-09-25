import axios from 'axios'

/** resas-APIからデータを取得
 * @param resasURL - APIのURL
 * @param prefCode - 都道府県コード
 * @param cityCode - 市区町村コード
 */
const getResasAPI = async (resasUrl, resasParams) => {
  const baseURL = 'https://opendata.resas-portal.go.jp/'
  const url =
    `${baseURL}${resasUrl}?` +
    Object.entries(resasParams)
      .map((e) => `${e[0]}=${e[1]}`)
      .join('&')
  const res = await axios.get(url, {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
    data: {},
  })
  return res.data.result
}

// 共通関数として利用する
export default (_, inject) => {
  inject('getResasAPI', getResasAPI)
}
