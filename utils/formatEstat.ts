import { getGraphSeriesStyle } from '@/utils/colors'

interface EstatResponse {
  GET_STATS_DATA: GETSTATSDATA
}

interface GETSTATSDATA {
  RESULT: RESULT
  PARAMETER: PARAMETER
  STATISTICAL_DATA: STATISTICALDATA
}

interface STATISTICALDATA {
  RESULT_INF: RESULTINF
  TABLE_INF: TABLEINF
  CLASS_INF: CLASSINF
  DATA_INF: DATAINF
}

interface DATAINF {
  NOTE: NOTE[]
  VALUE: VALUE[]
}

interface VALUE {
  '@tab': string
  '@cat01': string
  '@area': string
  '@time': string
  '@unit': string
  $: string
}

interface NOTE {
  '@char': string
  $: string
}

interface CLASSINF {
  CLASS_OBJ: CLASSOBJ[]
}

interface CLASSOBJ {
  '@id': string
  '@name': string
  CLASS: CLASS[] | CLASS | CLASS3
}

interface CLASS3 {
  '@code': string
  '@name': string
  '@level': string
  '@unit': string
}

interface CLASS {
  '@code': string
  '@name': string
  '@level': string
}

interface TABLEINF {
  '@id': string
  STAT_NAME: STATNAME
  GOV_ORG: STATNAME
  STATISTICS_NAME: string
  TITLE: TITLE
  CYCLE: string
  SURVEY_DATE: number
  OPEN_DATE: string
  SMALL_AREA: number
  COLLECT_AREA: string
  MAIN_CATEGORY: STATNAME
  SUB_CATEGORY: STATNAME
  OVERALL_TOTAL_NUMBER: number
  UPDATED_DATE: string
  STATISTICS_NAME_SPEC: STATISTICSNAMESPEC
  DESCRIPTION: DESCRIPTION
  TITLE_SPEC: TITLESPEC
}

interface TITLESPEC {
  TABLE_NAME: string
}

interface DESCRIPTION {
  TABULATION_CATEGORY_EXPLANATION: string
}

interface STATISTICSNAMESPEC {
  TABULATION_CATEGORY: string
  TABULATION_SUB_CATEGORY1: string
}

interface TITLE {
  '@no': string
  $: string
}

interface STATNAME {
  '@code': string
  $: string
}

interface RESULTINF {
  TOTAL_NUMBER: number
  FROM_NUMBER: number
  TO_NUMBER: number
}

interface PARAMETER {
  LANG: string
  STATS_DATA_ID: string
  NARROWING_COND: NARROWINGCOND
  DATA_FORMAT: string
  START_POSITION: number
  METAGET_FLG: string
  EXPLANATION_GET_FLG: string
  ANNOTATION_GET_FLG: string
  REPLACE_SP_CHARS: number
  CNT_GET_FLG: string
  SECTION_HEADER_FLG: number
}

interface NARROWINGCOND {
  CODE_CAT01_SELECT: string
  CODE_AREA_SELECT: number
}

interface RESULT {
  STATUS: number
  ERROR_MSG: string
  DATE: string
}

export type EstatParams = {
  statsDataId: string
  cdArea: string | string[] | null | undefined
  cdCat01: string[] | null | undefined
  cdCat02: string[] | null | undefined
  cdTab: string[] | null | undefined
}

// TimeChartの系列
export type TimeSeries = {
  name: string
  data: {
    x: number
    y: number
    unit: string
  }
  color: string
}

export type Times = {
  yearInt: number
  yearStr: string
  yearName: string
}

// 出典
export type Source = {
  name: string
  url: string
}

/**
 * Format for TimeChart
 *
 * @param data - Raw data
 */
export function formatTimeChart(
  estatResponse: EstatResponse,
  series: TimeSeries[]
) {
  const style = getGraphSeriesStyle(series.length)
  const value = estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  const chartData = series.map((d: TimeSeries, i) => {
    return {
      name: d.name,
      data: value
        .filter((f) => f[`@${d.id}`] === d.code)
        .map((d) => {
          return {
            x: parseInt(d['@time'].substr(0, 4)),
            y: parseFloat(d.$),
            unit: d['@unit'],
          }
        }),
      color: style[i].color,
    }
  })
  const times = formatTimeList(estatResponse)

  const tableHeaders = [
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

  const tableData = times.map((d) => {
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

  return {
    chartData,
    tableHeaders,
    tableData,
  }
}

/**
 * timeList
 * @param estatResponse - estat-APIのレスポンス
 */
export function formatTimeList(estatResponse: EstatResponse): Times[] {
  const value = estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
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

/**
 * additionalDescription
 * @param annotation - 注釈
 */
export function formatAdditionalDescription(annotation: string[]) {
  const estatCredit: string =
    'このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません'

  const timeChart: string[] = annotation.concat(estatCredit)

  return {
    timeChart,
  }
}

/**
 * source:出典
 * @param estatResponse - estat-APIのレスポンス
 */
export function formatSource(estatResponse: EstatResponse): Source {
  const TABLE_INF = estatResponse.GET_STATS_DATA.STATISTICAL_DATA.TABLE_INF
  return {
    name: `政府統計の総合窓口 e-Stat「${TABLE_INF.STAT_NAME.$}」`,
    url: `https://www.e-stat.go.jp/dbview?sid=${TABLE_INF['@id']}`,
  }
}
