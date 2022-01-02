import { getGraphSeriesStyle } from '@/utils/colors'
import {
  EstatResponse,
  EstatSeries,
  VALUE,
  EstatTimes,
  EstatTableHeader,
  EstatTableData,
} from '../types/estat'

type TimeChartData = {
  x: number
  y: number
  unit: string
}

type TimeChart = {
  name: string
  data: TimeChartData[]
  color: string
  yAxis?: number
  type?: string
}

/**
 * Format for TimeChart
 */
export function formatTimeChart(
  estatResponse: EstatResponse,
  series: EstatSeries[]
) {
  // 色の設定
  const style = getGraphSeriesStyle(series.length)

  const value: VALUE[] =
    estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // chartData
  const chartData: TimeChart[] = series.map((d, i) => {
    const key: keyof VALUE = `@${d.id}`
    return {
      name: d.name,
      data: value
        .filter((f) => f[key] === d.code)
        .map((d) => {
          return {
            x: parseInt(d['@time'].substr(0, 4)),
            y: parseFloat(d.$),
            unit: d['@unit'],
          }
        }),
      color: style[i].color,
      yAxis: d.yAxis,
      type: d.type,
    }
  })

  // TimeList
  const times: EstatTimes[] = _formatTimeList(value)

  const tableHeader: EstatTableHeader[] = [
    { text: '年', value: 'year', width: '80px' },
    ...chartData.map((d) => {
      return {
        text: d.name,
        value: d.name,
        align: 'center',
        width: '100px',
      }
    }),
  ]

  const tableData: EstatTableData[] = times.map((d: EstatTimes) => {
    return Object.assign(
      { year: `${d.yearInt}年` },
      ...chartData.map((item) => {
        const value = item.data.find((f) => f.x === d.yearInt)
        if (value) {
          return {
            [item.name]: value.y.toLocaleString() + item.data[0].unit,
          }
        } else {
          return ''
        }
      })
    )
  })

  const TABLE_INF = estatResponse.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  const source = _formatSource(TABLE_INF)

  return {
    chartData,
    tableHeader,
    tableData,
    source,
  }
}

/**
 * Format for PyramidChart
 */
export function formatPyramidChart(
  estatResponse: EstatResponse,
  series: EstatSeries[]
) {
  // 色の設定
  // const style = getGraphSeriesStyle(series.length)

  const value: VALUE[] =
    estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // TimeList
  const times = _formatTimeList(value)

  const chartData = times.map((d) => {
    const dataByTime = value.filter((f) => f['@time'] === d.yearStr)
    return {
      year: d.yearInt,
      data: series.map((d) => {
        const key: keyof VALUE = `@${d.id}`
        const man = dataByTime.find((f) => f[key] === d.man)
        const woman = dataByTime.find((f) => f[key] === d.woman)

        console.log({ man, woman })
        return {
          category: d.name,
          man: parseInt(man?.$) || 0,
          woman: parseInt(woman?.$) || 0,
          unit: dataByTime[0]['@unit'],
        }
      }),
    }
  })

  return {
    times,
    chartData,
    // tableHeader,
    // tableData,
    // source,
  }
}

/**
 * Format for PrefectureRankChart
 */
export function formatPrefectureRankChart(
  estatResponse: EstatResponse,
  series: EstatSeries,
  prefList: Pref[]
) {
  // 色の設定
  // const style = getGraphSeriesStyle(series.length)

  const value: VALUE[] =
    estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // TimeList
  const times: EstatTimes[] = _formatTimeList(value)

  // chartData
  const chartData: EstatSeries[] = times.map((d: EstatTimes) => {
    const v = value.filter((f) => f['@time'] === d.yearStr)
    return {
      year: d.yearInt,
      name: series.name,
      data: prefList.map((d) => {
        const cdArea = ('0000000000' + d.prefCode).slice(-2) + '000'
        const data = v.find((f) => f['@area'] === cdArea)
        if (data) {
          return {
            prefCode: cdArea,
            prefName: d.prefName,
            value: parseInt(data.$),
            unit: data['@unit'],
          }
        } else {
          return {
            prefCode: cdArea,
            prefName: 'test',
            value: '',
            unit: '',
          }
        }
      }),
    }
  })

  const tableHeader: EstatTableHeader[] = [
    { text: '都道府県名', value: 'prefName', width: '80px' },
    ...times.map((d) => {
      return {
        text: `${d.yearInt}年`,
        value: `${d.yearInt}年`,
        align: 'center',
        width: '100px',
      }
    }),
  ]

  const tableData: EstatTableData[] = prefList.map((d) => {
    const cdArea = ('0000000000' + d.prefCode).slice(-2) + '000'
    return Object.assign(
      { prefName: d.prefName },
      ...chartData.map((d) => {
        const data = d.data.find((f) => f.prefCode === cdArea)
        const year = `${d.year}年`
        if (data) {
          return {
            [year]: data.value.toLocaleString() + data.unit,
          }
        } else {
          return ''
        }
      })
    )
  })

  const TABLE_INF = estatResponse.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  const source = _formatSource(TABLE_INF)

  return {
    chartData,
    tableHeader,
    tableData,
    source,
    times,
  }
}

/**
 * Format for CityRankChart
 */
export function formatCityRankChart(
  estatResponse: EstatResponse,
  series: EstatSeries,
  cityList: City[]
) {
  // 色の設定
  // const style = getGraphSeriesStyle(series.length)

  const value: VALUE[] =
    estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // TimeList
  const times: EstatTimes[] = _formatTimeList(value)

  // chartData
  const chartData: EstatSeries[] = times.map((d: EstatTimes) => {
    const v = value.filter((f) => f['@time'] === d.yearStr)
    return {
      year: d.yearInt,
      name: series.name,
      data: cityList.map((d) => {
        const data = v.find((f) => f['@area'] === d.cityCode)
        if (data) {
          return {
            cityCode: d.cityCode,
            cityName: d.cityName,
            value: parseInt(data.$),
            unit: data['@unit'],
          }
        } else {
          return {
            cityCode: d.cityCode,
            cityName: d.cityName,
            value: '',
            unit: '',
          }
        }
      }),
    }
  })

  const tableHeader: EstatTableHeader[] = [
    { text: '市区町村名', value: 'cityName', width: '80px' },
    ...times.map((d) => {
      return {
        text: `${d.yearInt}年`,
        value: `${d.yearInt}年`,
        align: 'center',
        width: '100px',
      }
    }),
  ]

  const tableData: EstatTableData[] = cityList.map((d: City) => {
    const cityCode = d.cityCode
    return Object.assign(
      { cityName: d.cityName },
      ...chartData.map((d) => {
        const data = d.data.find((f) => f.cityCode === cityCode)
        const year = `${d.year}年`
        if (data) {
          return {
            [year]: data.value.toLocaleString() + data.unit,
          }
        } else {
          return ''
        }
      })
    )
  })

  const TABLE_INF = estatResponse.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  const source = _formatSource(TABLE_INF)

  return {
    chartData,
    tableHeader,
    tableData,
    source,
    times,
  }
}

function _formatTimeList(value: VALUE[]) {
  const times = Array.from(new Set(value.map((d) => d['@time']))).map((d) => {
    return {
      yearInt: parseInt(d.substr(0, 4)),
      yearStr: d,
      yearName: `${d.substr(0, 4)}年`,
    }
  })

  return times.sort((a, b) => {
    if (a.yearStr > b.yearStr) return -1
    if (a.yearStr < b.yearStr) return 1
    return 0
  })
}

function _formatSource(TABLE_INF): EstatSource {
  return {
    estatName: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
    estatUrl: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
  }
}

/**
 * additionalDescription
 * @param annotation - 注釈
 */
export function formatAdditionalDescription(annotation: string[]) {
  const estatCredit: string[] = [
    'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません',
  ]
  const codhCredit: string[] = ['歴史的行政区域データセットβ版（CODH作成）']

  return {
    timeChart: annotation.concat(estatCredit),
    rankChart: annotation.concat(estatCredit, codhCredit),
  }
}
