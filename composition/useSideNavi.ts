import { computed, inject } from '@nuxtjs/composition-api'
import { StateKey, StateType } from '@/composition/useGlobalState'
import { useContents } from '@/composition/useContents'
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
  const State: StateType = inject(StateKey)
  const { govType, code } = State

  const { getInitMenuTitles } = useContents()
  const setLink = (statField: string) => {
    const menuId = getInitMenuTitles.value.filter(
      (f) => f.statField === statField
    )[0]
    if (govType.value === 'prefecture') {
      return `/${govType.value}/${code.value}/${statField}/${menuId.prefecture}`
    } else {
      return `/${govType.value}/${code.value}/${statField}/${menuId.city}`
    }
  }

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
        link: setLink('landweather'),
      },
      {
        iconPath: mdiAccountMultiple,
        title: '人口・世帯',
        link: setLink('population'),
      },
      {
        iconPath: mdiCashMultiple,
        title: '労働・賃金',
        link: setLink('laborwage'),
      },
      {
        iconPath: mdiFish,
        title: '農林水産業',
        link: setLink('agriculture'),
      },
      {
        iconPath: mdiFactory,
        title: '鉱工業',
        link: setLink('miningindustry'),
      },
      {
        iconPath: mdiStore,
        title: '商業・サービス業',
        link: setLink('commercial'),
      },
      {
        iconPath: mdiOfficeBuilding,
        title: '企業・家計・経済',
        link: setLink('economy'),
      },
      {
        iconPath: mdiHomeAnalytics,
        title: '住宅・土地・建設',
        link: setLink('construction'),
      },
      {
        iconPath: mdiWater,
        title: 'エネルギー・水',
        link: setLink('energy'),
      },
      {
        iconPath: mdiTruck,
        title: '運輸・観光',
        link: setLink('tourism'),
      },
      {
        iconPath: mdiSchool,
        title: '教育・文化・スポーツ',
        link: setLink('educationsports'),
      },
      {
        iconPath: mdiCashUsd,
        title: '行財政',
        link: setLink('administrativefinancial'),
      },
      {
        iconPath: mdiSeatbelt,
        title: '司法・安全・環境',
        link: setLink('safetyenvironment'),
      },
      {
        iconPath: mdiHospitalBox,
        title: '社会保障・衛生',
        link: setLink('socialsecurity'),
      },
      {
        iconPath: mdiEarth,
        title: '国際',
        link: setLink('international'),
      },
      // {
      //   iconPath: mdiChartTimelineVariant,
      //   title: 'その他',
      //   link: `/${govType.value}/${code.value}/other/`,
      //   divider: true,
      // },
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
