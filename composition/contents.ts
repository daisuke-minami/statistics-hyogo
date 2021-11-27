import { reactive, toRefs, InjectionKey } from '@vue/composition-api'
// コンテンツ情報
import LandWeather from '@/data/pagesetting/landweather.json'
import Population from '@/data/pagesetting/population.json'
import LaborWage from '@/data/pagesetting/laborwage.json'
import Agriculture from '@/data/pagesetting/agriculture.json'
import MiningIndustry from '@/data/pagesetting/miningindustry.json'
import Commercial from '@/data/pagesetting/commercial.json'
import Economy from '@/data/pagesetting/economy.json'
import Construction from '@/data/pagesetting/construction.json'
import Energy from '@/data/pagesetting/energy.json'
import Tourism from '@/data/pagesetting/tourism.json'
import EducationSports from '@/data/pagesetting/educationsports.json'
import Administrativefinancial from '@/data/pagesetting/administrativefinancial.json'
import Safetyenvironment from '@/data/pagesetting/safetyenvironment.json'
import SocialSecurity from '@/data/pagesetting/socialsecurity.json'
import International from '@/data/pagesetting/international.json'
import Other from '@/data/pagesetting/other.json'

export type StateType = {
  title: string
  titleId: string
}

export type contents = {
  title: string
  titleId: string
  annotation: string[]
  estatParams: object
  series: []
}

export const useContentsState = () => {
  const contentsState = reactive<object>({
    landweather: LandWeather,
    population: Population,
    laborwage: LaborWage,
    agriculture: Agriculture,
    miningindustry: MiningIndustry,
    commercial: Commercial,
    economy: Economy,
    construction: Construction,
    energy: Energy,
    tourism: Tourism,
    educationsports: EducationSports,
    administrativefinancial: Administrativefinancial,
    safetyenvironment: Safetyenvironment,
    socialSecurity: SocialSecurity,
    international: International,
    other: Other,
  })

  const getContentsList = (statField: string, govType: string) => {
    return contentsState[`${statField}`][`${govType}`]
  }

  return {
    ...toRefs(contentsState),
    getContentsList,
  }
}

export type ContentsStateType = ReturnType<typeof useContentsState>
export const ContentsStateKey: InjectionKey<ContentsStateType> =
  Symbol('Contents')
