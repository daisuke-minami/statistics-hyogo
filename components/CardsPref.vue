<template>
  <div>
    <card-row class="DataBlock">
      <component
        :is="item.cardComponent"
        v-for="(item, i) in contentsList"
        :key="i"
        :contents="item.contents"
      />
    </card-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { mapGetters } from 'vuex'
import { ContentsType, ContentsList } from '~/utils/formatChart'

type Props = {
  statisticsClass: string
  contentsAll: ContentsType[]
}

type Computed = {
  prefInfomation: () => { prefName: string; prefCode: string }
  contentsList: () => ContentsList[]
}

type Methods = {}

const options: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  props: {
    statisticsClass: {
      type: String,
      required: true,
    },
    contentsAll: {
      // type: Object,
      required: true,
    },
  },
  data() {
    return {
      governmentType: 'prefecture',
    }
  },
  computed: {
    ...mapGetters('prefList', ['getSelectedPrefCode', 'getPrefName']),
    prefCode() {
      return this.getSelectedPrefCode
    },
    prefName() {
      return this.getPrefName(this.prefCode)
    },
    contentsList() {
      return this.contentsAll[this.governmentType].map((d) => {
        const prefName = this.prefName
        const prefCode = this.prefCode
        const statisticsClass = this.statisticsClass

        // 都道府県コードを5桁に変換してcdAreaに格納
        d.params.cdArea = ('0000000000' + prefCode).slice(-2) + '000'

        return {
          cardComponent: d.cardComponent,
          contents: {
            statisticsClass,
            governmentType: this.governmentType,
            title: `${prefName}の${d.title}`,
            titleId: d.titleId,
            additionalDescription: d.additionalDescription,
            routes: `${statisticsClass}/${d.titleId}/timechart/${this.governmentType}/${prefCode}/`,
            unit: d.unit,
            params: d.params,
          },
        }
      })
    },
  },
  created() {
    // console.log('contentsList:', this.contentsList)
  },
  methods: {},
}
export default Vue.extend(options)
</script>

<style lang="scss" scoped>
.DataBlock {
  margin: 20px -8px;

  .DataCard {
    @include largerThan($medium) {
      padding: 10px;
    }

    @include lessThan($small) {
      padding: 4px 8px;
    }
  }
}
.loader {
  height: 200px;
  width: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  img {
    display: block;
    margin: 0 auto 20px;
  }
}
</style>
