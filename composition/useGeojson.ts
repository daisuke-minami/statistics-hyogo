import * as topojson from 'topojson-client'

export const useGeojson = (axios) => {
  const geoshape = 'https://geoshape.ex.nii.ac.jp/city/topojson/20210101'

  const convertTopoToGeoCity = async (url: string) => {
    const { data: topo } = await axios.get(url)
    return topojson.feature(topo, topo.objects.city)
  }

  const convertTopoToGeoPref = async (url: string) => {
    const { data: topo } = await axios.get(url)
    return topojson.feature(topo, topo.objects.pref)
  }

  const getPrefMap = async () => {
    return await convertTopoToGeoPref(`${geoshape}/jp_pref.c.topojson`)
  }

  const getCityMap = async (prefCode: number) => {
    const join = await convertTopoToGeoCity(
      `${geoshape}/${prefCode}/${prefCode}_city_dc.l.topojson`
    )
    const split = await convertTopoToGeoCity(
      `${geoshape}/${prefCode}/${prefCode}_city.l.topojson`
    )
    return {
      join,
      split,
    }
  }

  return {
    getPrefMap,
    getCityMap,
  }
}
