import axios from 'axios'

// 地溝公共団体の情報
type lgInfo = {
  lgName: string
  lgCode: string
}

/** estat-APIからデータを取得
 * @param statsDataId - 統計表ID
 * @param cdArea - 都道府県コード or 市区町村コード（5桁）
 * @param cdCat01 - カテゴリコード
 */
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
  console.log('formatEstatTimeChartには来ている')
  const categories = contents.params.categories
  const statsDataId = contents.params.statsDataId
  const cdArea = contents.params.cdArea
  const contentsId = contents.contentsId
  const governmentType = contents.governmentType
  const titleId = contents.titleId

  // estatAPIのレスポンス取得（API）
  // const estatParam = () => {
  //   return {
  //     statsDataId,
  //     cdArea,
  //     cdCat01: categories.map((d) => d.cdCat01),
  //     cdCat02: null,
  //     cdTab: null,
  //   }
  // }
  // const res = await getEstatAPI(estatParam())
  // const resValue = res.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  // const CLASS_OBJ = res.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ

  // estatAPIのレスポンス取得（ローカルJSON）
  // 特定のcdAreaでfilterが必要
  const resAll = await import(
    `~/data/pagecontents/${contentsId}/${governmentType}/${titleId}.json`
  )
  const resValue = resAll.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE.filter(
    (d) => d['@area'] === cdArea
  )
  const CLASS_OBJ = resAll.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ

  console.log('resValue', resValue)

  const chartData = categories.map((item) => {
    const target = () => {
      if ('cdCat02' in categories[0]) {
        return resValue.filter((d) => d['@cat02'] === item.cdCat02)
      } else {
        return resValue.filter((d) => d['@cat01'] === item.cdCat01)
      }
    }
    console.log('target', target())
    const $ = target().map((d) => parseFloat(d.$))
    return {
      name: item.name,
      dataSetPanel: item.dataSetPanel,
      data: target().map((d) => ({
        x: parseInt(d['@time'].substr(0, 4)),
        y: parseFloat(d.$),
        unit: d['@unit'],
      })),
      max: _getArrayMinMax($).max,
      min: _getArrayMinMax($).min,
      unit: target()[0]['@unit'],
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

  const arr = CLASS_OBJ.find((d) => d['@id'] === 'time').CLASS

  const timeMaster = () => {
    return arr.map((item) => ({
      yearInt: parseInt(item['@code'].substr(0, 4)),
      yearStr: item['@code'],
    }))
  }

  const years = timeMaster().map((d) => d.yearInt)
  const tableData = years.map((year) => {
    return Object.assign(
      { year: year + '年' },
      ...chartData
        .map((item) => item.name)
        .map((name, j) => {
          const value = chartData[j].data.find((d) => d.x === year)
          if (value) {
            return {
              [name]: value.y.toLocaleString() + chartData[j].unit,
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

const _getUpdate = () => {
  const day = new Date(document.lastModified)
  return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
}

/** 配列内の最大値と最小値を取得
 * @param ary - 配列
 */
const _getArrayMinMax = (ary) => {
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
    lastUpdate: _getUpdate(),
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
  prefList: array,
  cityList: array
) => {
  const contentsId = contents.contentsId
  const governmentType = contents.governmentType
  const titleId = contents.titleId
  const categories = contents.params.categories
  const statsDataId = contents.params.statsDataId

  // estatAPIのレスポンス取得（API）
  // const cdArea = contents.params.cdArea
  // const estatParam = () => {
  //   return {
  //     statsDataId,
  //     cdArea,
  //     cdCat01: categories.map((d) => d.cdCat01),
  //     cdCat02: null,
  //     cdTab: null,
  //   }
  // }
  // const res = await getEstatAPI(estatParam())
  // const resValue = res.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // estatAPIのレスポンス取得（ローカルJSON）
  const res = await import(
    `~/data/pagecontents/${contentsId}/${governmentType}/${titleId}.json`
  )
  const resValue = res.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  console.log('resValue', resValue)

  const resTimes = Array.from(new Set(resValue.map((d) => d['@time']))).map(
    (item) => {
      return {
        yearInt: parseInt(item.substr(0, 4)),
        yearStr: item,
      }
    }
  )

  const chartData = resTimes.map((years) => {
    const dataByTime = () => {
      if ('cdCat02' in categories[0]) {
        return resValue.filter(
          (d) =>
            d['@time'] === years.yearStr &&
            d['@cat02'] === categories[0].cdCat02
        )
      } else {
        return resValue.filter(
          (d) =>
            d['@time'] === years.yearStr &&
            d['@cat01'] === categories[0].cdCat01
        )
      }
    }

    const localGavermentList = () => {
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

    const $ = dataByTime().map((d) => parseInt(d.$))
    return {
      year: years.yearInt,
      name: categories[0].name,
      max: _getArrayMinMax($).max,
      min: _getArrayMinMax($).min,
      data: localGavermentList().map((d) => {
        const dataByArea = dataByTime().find((e) => e['@area'] === d.lgCode)
        if (dataByArea) {
          return {
            id: d.lgCode,
            cityName: d.lgName,
            value: parseInt(dataByArea.$),
            unit: dataByArea['@unit'],
          }
        }
      }),
    }
  })

  return {
    contentsId: contents.contentsId,
    titleId: contents.titleId,
    title: contents.title,
    additionalDescription: contents.additionalDescription,
    routes: `${contents.routes}/map/`,
    chartData,
    resTimes,
    docURL: `https://www.e-stat.go.jp/dbview?sid=${statsDataId}`,
  }
}

/** estatのRankMapChartを設定
 * @param contents - コンテンツ情報
 * @param prefList - 都道府県リスト（市区町村の場合はnull）
 * @param cityList - 市区町村リスト（都道府県の場合はnull）
 */
const formatEstatRankBarChart = async (
  contents: object,
  prefList: array,
  cityList: array
) => {
  const contentsId = contents.contentsId
  const governmentType = contents.governmentType
  const titleId = contents.titleId
  const categories = contents.params.categories
  const statsDataId = contents.params.statsDataId

  // estatAPIのレスポンス取得（API）
  // const cdArea = contents.params.cdArea
  // const estatParam = () => {
  //   return {
  //     statsDataId,
  //     cdArea,
  //     cdCat01: categories.map((d) => d.cdCat01),
  //     cdCat02: null,
  //     cdTab: null,
  //   }
  // }
  // const res = await getEstatAPI(estatParam())
  // const resValue = res.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  // estatAPIのレスポンス取得（ローカルJSON）
  const res = await import(
    `~/data/pagecontents/${contentsId}/${governmentType}/${titleId}.json`
  )
  const resValue = res.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE

  const resTimes = Array.from(new Set(resValue.map((d) => d['@time']))).map(
    (item) => {
      return {
        yearInt: parseInt(item.substr(0, 4)),
        yearStr: item,
      }
    }
  )

  const chartData = resTimes.map((years) => {
    const dataByTime = () => {
      if ('cdCat02' in categories[0]) {
        return resValue.filter(
          (d) =>
            d['@time'] === years.yearStr &&
            d['@cat02'] === categories[0].cdCat02
        )
      } else {
        return resValue.filter(
          (d) =>
            d['@time'] === years.yearStr &&
            d['@cat01'] === categories[0].cdCat01
        )
      }
    }

    const localGavermentList = () => {
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

    const $ = dataByTime().map((d) => parseInt(d.$))
    return {
      year: years.yearInt,
      name: categories[0].name,
      max: _getArrayMinMax($).max,
      min: _getArrayMinMax($).min,
      data: localGavermentList().map((d) => {
        const dataByArea = dataByTime().find((e) => e['@area'] === d.lgCode)
        if (dataByArea) {
          return {
            name: d.lgName,
            y: parseInt(dataByArea.$),
            unit: dataByArea['@unit'],
          }
        }
      }),
    }
  })

  return {
    contentsId: contents.contentsId,
    titleId: contents.titleId,
    title: contents.title,
    additionalDescription: contents.additionalDescription,
    routes: `${contents.routes}/bar/`,
    chartData,
    resTimes,
    docURL: `https://www.e-stat.go.jp/dbview?sid=${statsDataId}`,
  }
}

// 共通関数として利用する
export default (_, inject) => {
  // inject('getEstatAPI', getEstatAPI)
  inject('formatEstatPyramidChart', formatEstatPyramidChart)
  inject('formatEstatRankMapChart', formatEstatRankMapChart)
  inject('formatEstatRankBarChart', formatEstatRankBarChart)
  inject('formatEstatTimeChart', formatEstatTimeChart)
}
