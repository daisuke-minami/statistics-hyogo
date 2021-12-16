export type ChartStyle = {
  color: string
}

type Series = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

const styleSingle: ChartStyle = {
  color: '#058DC7',
}
const styleA: ChartStyle = {
  color: '#7dbae5',
}
const styleB: ChartStyle = {
  color: '#ff69b4',
}
const styleC: ChartStyle = {
  color: '#DDDF00',
}
const styleD: ChartStyle = {
  color: '#24CBE5',
}
const styleE: ChartStyle = {
  color: '#64E572',
}
const styleF: ChartStyle = {
  color: '#FF9655',
}
const styleG: ChartStyle = {
  color: '#FFF263',
}
const styleH: ChartStyle = {
  color: '#24CBE5',
}
const styleI: ChartStyle = {
  color: '#64E572',
}
const styleJ: ChartStyle = {
  color: '#FF9655',
}
const styleK: ChartStyle = {
  color: '#FFF263',
}
const styleL: ChartStyle = {
  color: '#FFF263',
}
const styleM: ChartStyle = {
  color: '#24CBE5',
}
const styleN: ChartStyle = {
  color: '#64E572',
}
const styleO: ChartStyle = {
  color: '#FF9655',
}
const styleP: ChartStyle = {
  color: '#FFF263',
}
const styleQ: ChartStyle = {
  color: '#FFF263',
}
const styleR: ChartStyle = {
  color: '#24CBE5',
}
const styleS: ChartStyle = {
  color: '#64E572',
}
const styleT: ChartStyle = {
  color: '#FF9655',
}
const styleU: ChartStyle = {
  color: '#FFF263',
}

export function getGraphSeriesStyle(seriesLength: number) {
  switch (seriesLength) {
    case 1:
      return [styleSingle]
    default:
      return [
        styleA,
        styleB,
        styleC,
        styleD,
        styleE,
        styleF,
        styleG,
        styleH,
        styleI,
        styleJ,
        styleK,
        styleL,
        styleM,
        styleN,
        styleO,
        styleP,
        styleQ,
        styleR,
        styleS,
        styleT,
        styleU,
      ]
  }
}

// export function getGraphSeriesColor(series: Series) {
//   const styles: { [key in Series]: SurfaceStyle } = {
//     A: surfaceStyleA,
//     B: surfaceStyleB,
//     C: surfaceStyleC,
//     D: surfaceStyleD,
//     E: surfaceStyleE,
//     F: surfaceStyleF,
//     G: surfaceStyleG,
//   }
//   return styles[series]
// }
