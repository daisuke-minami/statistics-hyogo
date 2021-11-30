export type EstatParams = {
  statsDataId: string
  cdArea?: string | string[]
  cdCat01?: string | string[]
  cdCat02?: string | string[]
  cdTab?: string | string[]
  cdTime?: string | string[]
}

export type EstatSeries = {
  id?: string
  code?: string
  name: string
  type?: string
  yAxis?: number
}

export type EstatTimes = {
  yearInt?: number
  yearStr?: string
  yearName?: string
}

// 出典
export type EstatSource = {
  estatName: string
  estatUrl: string
}

export interface EstatResponse {
  GET_STATS_DATA?: GETSTATSDATA
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
