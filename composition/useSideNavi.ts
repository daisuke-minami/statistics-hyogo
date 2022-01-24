import { computed, inject, onMounted, reactive } from '@nuxtjs/composition-api'
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
  const globalState: StateType = inject(StateKey)
  const { govType, code } = globalState

  const state = reactive<any>({
    govType,
    code,
  })

  onMounted(() => {
    // const globalState: StateType = inject(StateKey)
    // const { govType, code } = globalState
    // console.log({ govType, code } )
  })

  const setLink = computed(() => {
    return function (statField: string) {
      const { getInitMenuTitles } = useContents()
      const menuId = () => {
        return getInitMenuTitles.value.filter(
          (f) => f.statField === statField
        )[0]
      }
      return `/${state.govType}/${state.code}/${statField}/${
        menuId().prefecture
      }`
    }
  })

  // console.log(test.value('landweather'))

  // const { getInitMenuTitles } = useContents()
  // const setLink.value = (statField: string) => {
  //   const menuId = getInitMenuTitles.value.filter(
  //     (f) => f.statField === statField
  //   )[0]
  //   if (state.govType === 'prefecture') {
  //     return `/${state.govType}/${state.code}/${statField}/${menuId.prefecture}`
  //   } else {
  //     return `/${state.govType}/${state.code}/${statField}/${menuId.city}`
  //   }
  // }

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
        link: setLink.value('landweather'),
      },
      {
        iconPath: mdiAccountMultiple,
        title: '人口・世帯',
        link: setLink.value('population'),
      },
      {
        iconPath: mdiCashMultiple,
        title: '労働・賃金',
        link: setLink.value('laborwage'),
      },
      {
        iconPath: mdiFish,
        title: '農林水産業',
        link: setLink.value('agriculture'),
      },
      {
        iconPath: mdiFactory,
        title: '鉱工業',
        link: setLink.value('miningindustry'),
      },
      {
        iconPath: mdiStore,
        title: '商業・サービス業',
        link: setLink.value('commercial'),
      },
      {
        iconPath: mdiOfficeBuilding,
        title: '企業・家計・経済',
        link: setLink.value('economy'),
      },
      {
        iconPath: mdiHomeAnalytics,
        title: '住宅・土地・建設',
        link: setLink.value('construction'),
      },
      {
        iconPath: mdiWater,
        title: 'エネルギー・水',
        link: setLink.value('energy'),
      },
      {
        iconPath: mdiTruck,
        title: '運輸・観光',
        link: setLink.value('tourism'),
      },
      {
        iconPath: mdiSchool,
        title: '教育・文化・スポーツ',
        link: setLink.value('educationsports'),
      },
      {
        iconPath: mdiCashUsd,
        title: '行財政',
        link: setLink.value('administrativefinancial'),
      },
      {
        iconPath: mdiSeatbelt,
        title: '司法・安全・環境',
        link: setLink.value('safetyenvironment'),
      },
      {
        iconPath: mdiHospitalBox,
        title: '社会保障・衛生',
        link: setLink.value('socialsecurity'),
      },
      {
        iconPath: mdiEarth,
        title: '国際',
        link: setLink.value('international'),
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
