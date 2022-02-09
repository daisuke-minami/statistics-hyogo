import prefListMaster from '~/data/codes/preflist.json'
import cityListMaster from '~/data/codes/citylist.json'
import { Pref, City, GovType } from '~/types/resas'

export const convertCodeToGovType = (code: string): GovType => {
  return code.slice(-3) === '000' ? 'prefecture' : 'city'
}

export const convertCodeToPrefCode = (code: string): number => {
  return +code.slice(0, 2)
}

export const getPref = (prefCode: number): Pref => {
  return (
    prefListMaster.result.find((f) => f.prefCode === prefCode) ??
    prefListMaster.result[0]
  )
}

export const getCity = (cityCode: string): City => {
  const prefCode = convertCodeToPrefCode(cityCode)
  const cityList = cityListMaster.result.filter((f) => f.prefCode === prefCode)
  return cityList.find((f) => f.cityCode === cityCode) ?? cityList[0]
}

export const getCityList = (
  prefCode: number,
  bigCityKind: string = 'all'
): City[] => {
  const cityListAll = cityListMaster.result.filter(
    (f) => f.prefCode === prefCode
  )

  if (bigCityKind === 'all') {
    return cityListAll
  } else if (bigCityKind === 'join') {
    return cityListAll.filter((f) => f.bigCityFlag !== '1')
  } else {
    return cityListAll.filter((f) => f.bigCityFlag !== '2')
  }
}
