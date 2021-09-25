/** 各クラスのチャートリスト作成
 * @param contentsId - クラス
 * @param isPref - 都道府県(true) or 市区町村(false)
 */
const getChartList = (contentsId: string, isPref: boolean) => {
  const param = () => {
    if (isPref) {
      return 'prefecture'
    } else {
      return 'city'
    }
  }

  const arr = process.env.Contents.filter((d) => d.contentsId === contentsId)
    .reduce((acc, cur) => {
      if (param() in cur) {
        acc.push(cur)
      }
      return acc
    }, [])
    .map((d) => {
      const cardComponent = getChartComponent(d.chartType)
      return {
        title: d.title,
        titleId: d.titleId,
        isRank: d.isRank,
        cardComponent,
      }
    })

  const ads = Math.ceil(arr.length / 4)

  for (let i = 0; i < ads - 1; i++) {
    arr.splice(4 + 6 * i, 0, {
      title: 'アドセンス',
      titleId: 'adsense',
      isRank: false,
      cardComponent: 'adsense-card',
    })
    arr.splice(4 + 6 * i, 0, {
      title: 'アドセンス',
      titleId: 'adsense',
      isRank: false,
      cardComponent: 'adsense-card',
    })
  }

  return arr
}

/** chartType別のコンポーネントを設定
 * @param chartType - チャート種別（String）
 */
const getChartComponent = (chartType) => {
  let cardComponent
  switch (chartType) {
    case 'estat-line':
      cardComponent = 'estat-line-chart-card'
      break
    case 'estat-line-break':
      cardComponent = 'estat-line-chart-break-card'
      break
    case 'estat-area':
      cardComponent = 'estat-area-chart-card'
      break
    case 'estat-area-break':
      cardComponent = 'estat-area-chart-break-card'
      break
    case 'estat-column':
      cardComponent = 'estat-column-chart-card'
      break
    case 'estat-column-break':
      cardComponent = 'estat-column-chart-break-card'
      break
    case 'estat-pyramid':
      cardComponent = 'estat-pyramid-chart-card'
      break
    case 'resas-line':
      cardComponent = 'resas-population-card'
      break
    case 'resas-pyramid':
      cardComponent = 'resas-population-pyramid-card'
      break
  }
  return cardComponent
}

const getUpdate = () => {
  const day = new Date(document.lastModified)
  return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日`
}

// 共通関数として利用する
export default (_, inject) => {
  inject('getChartList', getChartList)
  inject('getUpdate', getUpdate)
  inject('getChartComponent', getChartComponent)
  // inject('getLocalGovernmentInformation', getLocalGovernmentInformation)
}
