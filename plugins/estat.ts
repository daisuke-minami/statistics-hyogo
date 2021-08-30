import axios from 'axios'
// import { filter } from 'vue/types/umd'

/** estat-APIからデータを取得
 * @param statsDataId - 統計表ID
 * @param cdArea - 都道府県コード or 市区町村コード（5桁）
 * @param cdCat01 - カテゴリコード
 */
// const estatParam = () => {
//   return {
//     statsDataId,
//     cdArea,
//     cdCat01: categories.map((d) => d.cdCat01),
//     cdCat02: null,
//     cdTab: null,
//   }
// }
const getEstatAPI = async (estatParam) => {
  const statsDataId = estatParam.statsDataId
  let url = `${process.env.ESTAT_API}/json/getStatsData?appId=${process.env.ESTAT_APPID}&statsDataId=${statsDataId}`
  if (estatParam.cdArea) {
    url = url + `&cdArea=${estatParam.cdArea}`
  }
  if (estatParam.cdCat01) {
    url = url + `&cdCat01=${estatParam.cdCat01}`
  }
  const res = await axios.get(url, {
    mode: 'cors',
    withCredentials: true,
    data: {},
  })
  return res.data
}

/** estatのTimeChartを設定
 * @param titleId - 統計タイトルId
 * @param lgInfo - 地方公共団体の情報
 */
const formatEstatTimeChart = async (contents: object) => {
  const categories = contents.params.categories
  const statsDataId = contents.params.statsDataId
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

  const resTimes = _setTimes(resValue)

  const chartData = categories.map((item) => {
    const value = _filterValue(resValue, item)
    return {
      name: item.name,
      dataSetPanel: item.dataSetPanel,
      data: value.map((d) => ({
        x: parseInt(d['@time'].substr(0, 4)),
        y: parseFloat(d.$),
        unit: d['@unit'],
      })),
      max: _getArrayMinMax(value).max,
      min: _getArrayMinMax(value).min,
      unit: value[0]['@unit'],
      yAxis: item.yAxis,
      opposite: item.opposite,
    }
  })

  const infoData = chartData.find((d) => (d.dataSetPanel = true))
  const length = infoData.data.length
  const displayInfo = {
    lText: infoData.data[length - 1].y.toLocaleString(),
    sText: infoData.data[length - 1].x + '年の' + infoData.name,
    unit: infoData.unit,
  }

  const tableHeaders = [
    { text: '年', value: 'year', width: '80px' },
    ...chartData.map((item) => {
      return {
        text: item.name,
        value: item.name,
        align: 'center',
        width: '100px',
      }
    }),
  ]

  const tableData = resTimes.map((d) => {
    return Object.assign(
      { year: `${d.yearInt}年` },
      ...chartData.map((item) => {
        const value = item.data.find((f) => f.x === d.yearInt)
        if (value) {
          return {
            [item.name]: value.y.toLocaleString() + item.unit,
          }
        } else {
          return ''
        }
      })
    )
  })

  return {
    contentsId: contents.contentsId,
    titleId: contents.titleId,
    title: contents.title,
    additionalDescription: contents.additionalDescription,
    routes: contents.routes,
    chartData,
    displayInfo,
    tableHeaders,
    tableData,
    docURL: `https://www.e-stat.go.jp/dbview?sid=${statsDataId}`,
  }
}

/** 配列内の最大値と最小値を取得
 * @param ary - 配列
 */
const _getArrayMinMax = (value) => {
  // 値だけを抽出
  const ary = value.map((d) => parseFloat(d.$))
  // 大きい順にsort（null NaN対応）
  const aryMax = ary.concat()
  aryMax.sort(function (a, b) {
    const aIsNotNumeric = a == null || isNaN(a)
    const bIsNotNumeric = b == null || isNaN(b)
    if (aIsNotNumeric && bIsNotNumeric) {
      return 0
    } else if (aIsNotNumeric) {
      return 1
    } else if (bIsNotNumeric) {
      return -1
    } else {
      return b - a
    }
  })

  // 小さい順にsort（null NaN対応）
  const aryMin = ary.concat()
  aryMin.sort(function (a, b) {
    const aIsNotNumeric = a == null || isNaN(a)
    const bIsNotNumeric = b == null || isNaN(b)
    if (aIsNotNumeric && bIsNotNumeric) {
      return 0
    } else if (aIsNotNumeric) {
      return 1
    } else if (bIsNotNumeric) {
      return -1
    } else {
      return a - b
    }
  })

  const max = aryMax[0]
  const min = aryMin[0]

  return { max, min }
}

/** estatのPyramidChartを設定
 * @param titleId - 統計タイトルId
 * @param lgInfo - 地方公共団体の情報
 */
const formatEstatPyramidChart = async (contents: object) => {
  const categories = contents.params.categories
  const statsDataId = contents.params.statsDataId
  const cdArea = contents.params.cdArea

  const estatParam = () => {
    return {
      statsDataId,
      cdArea,
      cdCat01: categories.map((d) => d.cdCat01),
      cdCat02: null,
      cdTab: null,
    }
  }

  const res = await getEstatAPI(estatParam())
  const resValue = res.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  const resTimes = Array.from(new Set(resValue.map((d) => d['@time']))).map(
    (item) => {
      return {
        yearInt: parseInt(item.substr(0, 4)),
        yearStr: item,
      }
    }
  )

  const pyramidCategories = categories
    .filter((d) => d.name.includes('男'))
    .map((i) => i.name.slice(0, -3))

  const chartData = resTimes.map((years) => {
    const dataByTime = resValue
      .filter((d) => d['@time'] === years.yearStr)
      .map((i) => {
        return {
          name: categories.find((t) => t.cdCat01 === i['@cat01']).name,
          year: years.yearInt,
          value: parseInt(i.$),
        }
      })
    return {
      year: years.yearInt,
      data: [
        {
          name: '男性',
          data: dataByTime
            .filter((d) => d.name.includes('男'))
            .map((t) => -1 * t.value),
          color: '#4169e1',
        },
        {
          name: '女性',
          data: dataByTime
            .filter((d) => d.name.includes('女'))
            .map((t) => t.value),
          color: '#ff69b4',
        },
      ],
    }
  })

  const tableHeaders = [
    { text: '年齢区分', value: 'class', align: 'end' },
    { text: '男性', value: 'man', align: 'end' },
    { text: '女性', value: 'woman', align: 'end' },
  ]

  const tableData = resTimes.map((years) => {
    const dataByTime = resValue
      .filter((d) => d['@time'] === years.yearStr)
      .map((i) => {
        return {
          name: categories.find((t) => t.cdCat01 === i['@cat01']).name,
          year: years.yearInt,
          value: parseInt(i.$),
        }
      })

    function _isUndefined(d) {
      if (!d) {
        return ''
      } else {
        return d.value
      }
    }

    return {
      year: years.yearInt,
      data: pyramidCategories.map((item) => {
        const man = dataByTime.find((t) => t.name.includes(`${item}（男）`))
        const woman = dataByTime.find((t) => t.name.includes(`${item}（女）`))
        return {
          class: item,
          man: _isUndefined(man),
          woman: _isUndefined(woman),
        }
      }),
    }
  })

  return {
    titleId: contents.titleId,
    title: contents.title,
    additionalDescription: contents.additionalDescription,
    routes: contents.routes,
    chartData,
    resTimes,
    tableHeaders,
    tableData,
    pyramidCategories,
    docURL: `https://www.e-stat.go.jp/dbview?sid=${statsDataId}`,
    // lastUpdate: _getUpdate(),
  }
}

// /** estat-APIの取得結果をRatestInformationTableにフォーマット
//  * @param estatJson - estat-APIの取得結果
//  */
// const formatEstatDataToLatestInformationTable = (estatJson, categories) => {
//   const TableData = new EstatData(estatJson, categories)

//   const tableHeaders = [
//     { text: '統計項目名', value: 'categoryName', width: '80px' },
//     { text: '統計値', value: 'value', width: '50px', align: 'end' },
//     { text: '単位', value: 'unit', width: '50px', align: 'center' },
//     { text: '調査年次', value: 'year', width: '30px', align: 'end' },
//   ]

//   const tableData = TableData.categoryMaster().map((i) => {
//     const d = TableData.resValue()
//       .filter((j) => j['@cat01'] === i.categoryCode)
//       .pop()
//     return {
//       categoryName: i.categoryName,
//       value: parseInt(d.$).toLocaleString(),
//       unit: d['@unit'],
//       year: d['@time'].substr(0, 4) + '年',
//     }
//   })

//   const cityName = TableData.resArea().cityName

//   return { tableHeaders, tableData, cityName }
// }

/** estatのRankMapChartを設定
 * @param contents - コンテンツ情報
 * @param prefList - 都道府県リスト（市区町村の場合はnull）
 * @param cityList - 市区町村リスト（都道府県の場合はnull）
 */
const formatEstatRankMapChart = async (
  contents: object,
  prefList: [],
  cityList: []
) => {
  const contentsId = contents.contentsId
  const governmentType = contents.governmentType
  const titleId = contents.titleId
  const categories = contents.params.categories
  const statsDataId = contents.params.statsDataId

  // estatAPIのレスポンス取得（ローカルJSON）
  const res = await import(
    `~/static/pagecontents/${contentsId}/${governmentType}/${titleId}.json`
  )
  const resValue = res.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // 年次一覧の設定
  const resTimes = _setTimes(resValue)

  // 都道府県リスト or 市区町村リストの作成
  const localGavermentList = _setlocalGavermentList(prefList, cityList)

  const chartData = resTimes.map((years) => {
    // 検索パラメータの設定
    const params = categories[0]
    delete params.name
    params.time = years.yearStr

    const valueByTime = _filterValue(resValue, params)

    return {
      year: years.yearInt,
      name: categories[0].name,
      max: _getArrayMinMax(valueByTime).max,
      min: _getArrayMinMax(valueByTime).min,
      data: localGavermentList.map((d) => {
        const dataByArea = valueByTime.find((e) => e['@area'] === d.lgCode)
        if (dataByArea) {
          return {
            lgCode: d.lgCode,
            lgName: d.lgName,
            value: parseInt(dataByArea.$),
            unit: dataByArea['@unit'],
          }
        } else {
          return {
            lgCode: d.lgCode,
            lgName: d.lgName,
            value: '',
            unit: '',
          }
        }
      }),
    }
  })

  const tableHeaders = [
    { text: '都道府県名', value: 'lgName', width: '80px' },
    ...resTimes.map((item) => {
      return {
        text: `${item.yearInt}年`,
        value: `${item.yearInt}年`,
        align: 'center',
        width: '100px',
      }
    }),
  ]

  const tableData = localGavermentList.map((d) => {
    return Object.assign(
      { lgName: d.lgName },
      ...chartData.map((item) => {
        const data = item.data.find((f) => f.lgCode === d.lgCode)
        const year = `${item.year}年`
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

  return {
    contentsId: contents.contentsId,
    titleId: contents.titleId,
    title: contents.title,
    additionalDescription: contents.additionalDescription,
    routes: `${contents.routes}/map/`,
    chartData,
    tableHeaders,
    tableData,
    resTimes,
    docURL: `https://www.e-stat.go.jp/dbview?sid=${statsDataId}`,
  }
}

/** estatのRankBarChartを設定
 * @param contents - コンテンツ情報
 * @param prefList - 都道府県リスト（市区町村の場合はnull）
 * @param cityList - 市区町村リスト（都道府県の場合はnull）
 */
const formatEstatRankBarChart = async (
  contents: object,
  prefList: [],
  cityList: []
) => {
  const contentsId = contents.contentsId
  const governmentType = contents.governmentType
  const titleId = contents.titleId
  const categories = contents.params.categories
  const statsDataId = contents.params.statsDataId

  // estatAPIのレスポンス取得（ローカルJSON）
  const res = await import(
    `~/static/pagecontents/${contentsId}/${governmentType}/${titleId}.json`
  )
  const resValue = res.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // 年次一覧の設定
  const resTimes = _setTimes(resValue)

  // 都道府県リスト or 市区町村リストの作成
  const localGavermentList = _setlocalGavermentList(prefList, cityList)

  const chartData = resTimes.map((years) => {
    // 検索パラメータの設定
    const params = categories[0]
    delete params.name
    params.time = years.yearStr

    const valueByTime = _filterValue(resValue, params)

    return {
      year: years.yearInt,
      name: categories[0].name,
      max: _getArrayMinMax(valueByTime).max,
      min: _getArrayMinMax(valueByTime).min,
      data: localGavermentList.map((d) => {
        const dataByArea = valueByTime.find((e) => e['@area'] === d.lgCode)
        if (dataByArea) {
          return {
            lgCode: d.lgCode,
            name: d.lgName,
            y: parseInt(dataByArea.$),
            unit: dataByArea['@unit'],
          }
        } else {
          return {
            lgCode: d.lgCode,
            name: d.lgName,
            y: '',
            unit: '',
          }
        }
      }),
    }
  })

  const tableHeaders = [
    { text: '都道府県名', value: 'lgName', width: '80px' },
    ...resTimes.map((item) => {
      return {
        text: `${item.yearInt}年`,
        value: `${item.yearInt}年`,
        align: 'center',
        width: '100px',
      }
    }),
  ]

  const tableData = localGavermentList.map((d) => {
    return Object.assign(
      { lgName: d.lgName },
      ...chartData.map((item) => {
        const data = item.data.find((f) => f.lgCode === d.lgCode)
        const year = `${item.year}年`
        if (data) {
          return {
            [year]: data.y.toLocaleString() + data.unit,
          }
        } else {
          return ''
        }
      })
    )
  })

  return {
    contentsId: contents.contentsId,
    titleId: contents.titleId,
    title: contents.title,
    additionalDescription: contents.additionalDescription,
    routes: `${contents.routes}/bar/`,
    chartData,
    tableHeaders,
    tableData,
    resTimes,
    docURL: `https://www.e-stat.go.jp/dbview?sid=${statsDataId}`,
  }
}

type Params = {
  cdCat01: string | null
  cdCat02: string | null
  cdTab: string | null
  time: string | null
  area: string | null
}

/** estatAPIの結果をカテゴリパラメータ（cdCat01,cdCat02,cdTab）でフィルタ
 * @param resValue -
 * @param categories -
 */
const _filterValue = (resValue: object, params: Params) => {
  // console.log(params)
  let value = resValue
  if ('cdCat01' in params) {
    value = value.filter((d) => d['@cat01'] === params.cdCat01)
  }
  if ('cdCat02' in params) {
    value = value.filter((d) => d['@cat02'] === params.cdCat02)
  }
  if ('time' in params) {
    value = value.filter((d) => d['@time'] === params.time)
  }
  if ('area' in params) {
    value = value.filter((d) => d['@area'] === params.area)
  }

  return value
}

/** 都道府県リストまたは市区町村リストを整理する関数
 * @param prefList -都道府県リスト
 * @param cityList -市区町村リスト
 */
const _setlocalGavermentList = (prefList, cityList) => {
  if (prefList) {
    return prefList.map((d) => {
      return {
        lgCode: ('0000000000' + d.prefCode).slice(-2) + '000',
        lgName: d.prefName,
      }
    })
  } else {
    return cityList.map((d) => {
      return {
        lgCode: d.cityCode,
        lgName: d.cityName,
      }
    })
  }
}

/** 年次一覧リストを作成する関数
 * @param resValue - estatAPIのレスポンス
 */
const _setTimes = (resValue: object) => {
  return Array.from(new Set(resValue.map((d) => d['@time'])))
    .map((item) => {
      return {
        yearInt: parseInt(item.substr(0, 4)),
        yearStr: item,
      }
    })
    .sort((a, b) => {
      if (a.yearStr > b.yearStr) return -1
      if (a.yearStr < b.yearStr) return 1
      return 0
    })
}

// 共通関数として利用する
export default (_, inject) => {
  inject('formatEstatPyramidChart', formatEstatPyramidChart)
  inject('formatEstatRankMapChart', formatEstatRankMapChart)
  inject('formatEstatRankBarChart', formatEstatRankBarChart)
  inject('formatEstatTimeChart', formatEstatTimeChart)
}
