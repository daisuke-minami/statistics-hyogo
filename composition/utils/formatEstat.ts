import { EstatResponse, EstatSource, EstatTimes } from '~/types/estat'

export const convertPrefCodeToString = (prefCode: number): string => {
  return ('0000000000' + prefCode).slice(-2) + '000'
}

export const formatEstatTimeList = (response: EstatResponse): EstatTimes[] => {
  const value = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  return Array.from(new Set(value.map((d) => d['@time'])))
    .map((d) => {
      return {
        yearInt: parseInt(d.substr(0, 4)),
        yearStr: d,
        yearName: `${d.substr(0, 4)}年`,
      }
    })
    .sort((a, b) => {
      if (a.yearStr > b.yearStr) return -1
      if (a.yearStr < b.yearStr) return 1
      return 0
    })
}

export const formatEstatSource = (response: EstatResponse): EstatSource => {
  const TABLE_INF = response.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  return {
    estatName: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
    estatUrl: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
  }
}
