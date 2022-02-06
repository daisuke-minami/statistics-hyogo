export type EstatParams = {
  statsDataId: string
  cdArea?: string | string[]
  cdCat01?: string | string[]
  cdCat02?: string | string[]
  cdTab?: string | string[]
  cdTime?: string | string[]
}

export type EstatState = {
  title: string
  titleId: string
  params: EstatParams
  series: EstatSeries[]
  annotation: string[]
  latestYear?: EstatTimes
}

export type EstatSeries = {
  id: string
  code: string
  name: string
  type?: string
  yAxis?: number
  color?: string
  data?: []
  year?: number
  man?: string
  woman?: string
}

export type EstatTimes = {
  yearInt?: number
  yearStr?: string
  yearName?: string
}

export type EstatTimeChart = {
  name: string
  data: {
    x: number
    y: number
    unit: string
  }
  color: string
  yAxis?: number
  type?: string
}

export type EstatSource = {
  estatName: string
  estatUrl: string
}

export type EstatResponse = {
  GET_STATS_DATA: GETSTATSDATA
}

export type EstatTableHeader = {
  text: string
  value: string
  width: string
}

export type EstatTableData = {
  text: string
  value: string
  align: string
  width: string
}

type GETSTATSDATA = {
  RESULT: RESULT
  PARAMETER: PARAMETER
  STATISTICAL_DATA: STATISTICALDATA
}

type STATISTICALDATA = {
  RESULT_INF: RESULTINF
  TABLE_INF: TABLEINF
  CLASS_INF: CLASSINF
  DATA_INF: DATAINF
}

type DATAINF = {
  NOTE: NOTE[]
  VALUE: VALUE[]
}

export type VALUE = {
  [key: string]: string
  '@tab': string
  '@cat01': string
  '@area': string
  '@time': string
  '@unit': string
  $: string
}

type NOTE = {
  '@char': string
  $: string
}

type CLASSINF = {
  CLASS_OBJ: CLASSOBJ[]
}

type CLASSOBJ = {
  '@id': string
  '@name': string
  CLASS: CLASS[] | CLASS | CLASS3
}

type CLASS3 = {
  '@code': string
  '@name': string
  '@level': string
  '@unit': string
}

type CLASS = {
  '@code': string
  '@name': string
  '@level': string
}

type TABLEINF = {
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

type TITLESPEC = {
  TABLE_NAME: string
}

type DESCRIPTION = {
  TABULATION_CATEGORY_EXPLANATION: string
}

type STATISTICSNAMESPEC = {
  TABULATION_CATEGORY: string
  TABULATION_SUB_CATEGORY1: string
}

type TITLE = {
  '@no': string
  $: string
}

type STATNAME = {
  '@code': string
  $: string
}

type RESULTINF = {
  TOTAL_NUMBER: number
  FROM_NUMBER: number
  TO_NUMBER: number
}

type PARAMETER = {
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

type NARROWINGCOND = {
  CODE_CAT01_SELECT: string
  CODE_AREA_SELECT: number
}

type RESULT = {
  STATUS: number
  ERROR_MSG: string
  DATE: string
}

export type Series = {
  id?: string
  code?: string
  name: string
  type?: string
  yAxis?: number
}

export type Times = {
  yearInt?: number
  yearStr?: string
  yearName?: string
}

export type StateType = {
  estatParams: EstatParams
  series: Series[]
  latestYear: Times
  annotation: never[]
}
