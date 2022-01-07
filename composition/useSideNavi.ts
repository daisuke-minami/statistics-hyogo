import { computed, inject } from '@nuxtjs/composition-api'
import { PageStateKey, PageStateType } from '@/composition/pageState'
// import { useContents } from '@/composition/useContents'
import {
  mdiWeatherPartlyCloudy,
  mdiAccountMultiple,
  mdiCashMultiple,
  mdiFish,
  mdiFactory,
  mdiStore,
  mdiOfficeBuilding,
  mdiHomeAnalytics,
  mdiWater,
  mdiTruck,
  mdiChartTimelineVariant,
  mdiSchool,
  mdiCashUsd,
  mdiEarth,
  // mdiClose,
  mdiHospitalBox,
  mdiSeatbelt,
  // mdiMenu,
} from '@mdi/js'

type MenuItem = {
  iconPath?: string
  svg?: string
  title: string
  link: string
  divider?: boolean
}

export const useSideNavi = () => {
  // const data = reactive({
  //   mdiClose,
  //   mdiMenu,
  // })

  const pageState: PageStateType = inject(PageStateKey)
  const { govType, code } = pageState
  // console.log({ govType, code })

  // const initMenuTitle = useContents().getInitMenuTitles.value
  // console.log(initMenuTitle)

  const naviItems = computed((): MenuItem[] => {
    return [
      {
        iconPath: mdiChartTimelineVariant,
        title: '基本情報',
        link: '/',
      },
      {
        iconPath: mdiWeatherPartlyCloudy,
        title: '国土・気象',
        link: `/${govType.value}/${code.value}/landweather/`,
      },
      {
        iconPath: mdiAccountMultiple,
        title: '人口・世帯',
        link: `/${govType.value}/${code.value}/population/`,
      },
      {
        iconPath: mdiCashMultiple,
        title: '労働・賃金',
        link: `/${govType.value}/${code.value}/laborwage/`,
      },
      {
        iconPath: mdiFish,
        title: '農林水産業',
        link: `/${govType.value}/${code.value}/agriculture/`,
      },
      {
        iconPath: mdiFactory,
        title: '鉱工業',
        link: `/${govType.value}/${code.value}/miningindustry/`,
      },
      {
        iconPath: mdiStore,
        title: '商業・サービス業',
        link: `/${govType.value}/${code.value}/commercial/`,
      },
      {
        iconPath: mdiOfficeBuilding,
        title: '企業・家計・経済',
        link: `/${govType.value}/${code.value}/economy/`,
      },
      {
        iconPath: mdiHomeAnalytics,
        title: '住宅・土地・建設',
        link: `/${govType.value}/${code.value}/construction/`,
      },
      {
        iconPath: mdiWater,
        title: 'エネルギー・水',
        link: `/${govType.value}/${code.value}/energy/`,
      },
      {
        iconPath: mdiTruck,
        title: '運輸・観光',
        link: `/${govType.value}/${code.value}/tourism/`,
      },
      {
        iconPath: mdiSchool,
        title: '教育・文化・スポーツ',
        link: `/${govType.value}/${code.value}/educationsports/`,
      },
      {
        iconPath: mdiCashUsd,
        title: '行財政',
        link: `/${govType.value}/${code.value}/administrativefinancial/`,
      },
      {
        iconPath: mdiSeatbelt,
        title: '司法・安全・環境',
        link: `/${govType.value}/${code.value}/safetyenvironment/`,
      },
      {
        iconPath: mdiHospitalBox,
        title: '社会保障・衛生',
        link: `/${govType.value}/${code.value}/socialsecurity/`,
      },
      {
        iconPath: mdiEarth,
        title: '国際',
        link: `/${govType.value}/${code.value}/international/`,
      },
      {
        iconPath: mdiChartTimelineVariant,
        title: 'その他',
        link: `/${govType.value}/${code.value}/other/`,
        divider: true,
      },
      {
        title: 'RESAS-APIの使い方',
        link: '/resas/',
        // divider: true,
      },
      {
        title: '当サイトについて',
        link: '/about/',
      },
    ]
  })

  return {
    // mdiClose: data.mdiClose,
    // mdiMenu: data.mdiMenu,
    naviItems,
  }
}
