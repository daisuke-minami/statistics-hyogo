import { computed } from '@nuxtjs/composition-api'
import { useChangeRouter } from '@/composition/useChangeRouter'
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
  // Routing設定
  const { getSideNaviLink } = useChangeRouter()

  // ナビゲーションアイテム
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
        link: getSideNaviLink.value('landweather'),
      },
      {
        iconPath: mdiAccountMultiple,
        title: '人口・世帯',
        link: getSideNaviLink.value('population'),
      },
      {
        iconPath: mdiCashMultiple,
        title: '労働・賃金',
        link: getSideNaviLink.value('laborwage'),
      },
      {
        iconPath: mdiFish,
        title: '農林水産業',
        link: getSideNaviLink.value('agriculture'),
      },
      {
        iconPath: mdiFactory,
        title: '鉱工業',
        link: getSideNaviLink.value('miningindustry'),
      },
      {
        iconPath: mdiStore,
        title: '商業・サービス業',
        link: getSideNaviLink.value('commercial'),
      },
      {
        iconPath: mdiOfficeBuilding,
        title: '企業・家計・経済',
        link: getSideNaviLink.value('economy'),
      },
      {
        iconPath: mdiHomeAnalytics,
        title: '住宅・土地・建設',
        link: getSideNaviLink.value('construction'),
      },
      {
        iconPath: mdiWater,
        title: 'エネルギー・水',
        link: getSideNaviLink.value('energy'),
      },
      {
        iconPath: mdiTruck,
        title: '運輸・観光',
        link: getSideNaviLink.value('tourism'),
      },
      {
        iconPath: mdiSchool,
        title: '教育・文化・スポーツ',
        link: getSideNaviLink.value('educationsports'),
      },
      {
        iconPath: mdiCashUsd,
        title: '行財政',
        link: getSideNaviLink.value('administrativefinancial'),
      },
      {
        iconPath: mdiSeatbelt,
        title: '司法・安全・環境',
        link: getSideNaviLink.value('safetyenvironment'),
      },
      {
        iconPath: mdiHospitalBox,
        title: '社会保障・衛生',
        link: getSideNaviLink.value('socialsecurity'),
      },
      {
        iconPath: mdiEarth,
        title: '国際',
        link: getSideNaviLink.value('international'),
      },
      {
        title: '当サイトについて',
        link: '/about/',
      },
    ]
  })

  return {
    naviItems,
  }
}
