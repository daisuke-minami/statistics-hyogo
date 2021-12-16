<template>
  <div class="DataView-Inner">
    <div
      class="DataView-Header"
      :class="!!$slots.dataSetPanel ? 'with-dataSetPanel' : ''"
    >
      <h3
        class="DataView-Title"
        :class="
          !!$slots.infoPanel
            ? 'with-infoPanel'
            : !!$slots.dataSetPanel
            ? 'with-dataSetPanel'
            : ''
        "
      >
        {{ title }}
      </h3>

      <div v-if="!!$slots.infoPanel" class="DataView-InfoPanel">
        <slot name="infoPanel" />
      </div>
      <div v-if="!!$slots.dataSetPanel" class="DataView-DataSetPanel">
        <slot name="dataSetPanel" />
      </div>
    </div>

    <div v-if="this.$slots.attentionNote" class="DataView-AttentionNote">
      <slot name="attentionNote" />
    </div>

    <div class="DataView-Description">
      <slot name="description" />
    </div>

    <div>
      <slot name="button" />
    </div>

    <!-- ここにグラフを表示 -->
    <!-- slotのnameが指定されていないコンテンツがここに表示される？ -->
    <div class="DataView-Content">
      <slot />
    </div>

    <div>
      <slot name="slider" />
    </div>

    <!-- 注釈 -->
    <div class="DataView-Description DataView-Description--Additional">
      <slot name="additionalDescription" />
    </div>

    <data-view-expantion-panel
      v-if="this.$slots.dataTable"
      class="DataView-ExpantionPanel"
    >
      <slot name="dataTable" />
    </data-view-expantion-panel>

    <div class="DataView-Space" />

    <div class="DataView-Footer">
      <div>
        <slot name="footer" />
        <div>
          <app-link class="Permalink" :to="permalink">
            {{ '個別記事' }}
          </app-link>
        </div>
      </div>

      <!-- シェアボタン -->
      <data-view-share
        v-if="this.$route.query.embed != 'true'"
        :title="title"
        :route="route"
        class="Footer-Right"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
    route: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    headTitle: {
      type: String,
      default: '',
    },
  },
  computed: {
    formattedDateForDisplay(): string {
      return this.date !== '' ? (new Date(this.date), 'dateTime') : ''
    },
    permalink(): string {
      return `${this.route}`
    },
  },
  head(): MetaInfo {
    // カードの個別ページの場合は、タイトルを`page/_titleId/_codes/_type`に渡す
    if (!this.$route.params.codes) return {}

    return {
      title: this.headTitle ? this.headTitle : this.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.headTitle ? this.headTitle : this.title,
        },
      ],
    }
  },
})
</script>

<style lang="scss">
.DataView {
  height: 100%;
  @include card-container();

  &-Header {
    display: flex;
    align-items: flex-start;
    flex-flow: column;
    padding: 0 10px;

    @include largerThan($medium) {
      padding: 0 5px;
    }

    @include largerThan($large) {
      justify-content: space-between;
      flex-flow: row;
      padding: 0;

      &.with-dataSetPanel {
        flex-flow: column;
      }
    }
  }

  &-Inner {
    display: flex;
    flex-flow: column;
    padding: 22px;
    height: 100%;
  }

  &-Title {
    width: 100%;
    margin-bottom: 10px;
    line-height: 1.5;
    font-weight: normal;
    color: $gray-2;
    @include font-size(20);

    &.with-dataSetPanel {
      margin-bottom: 0;
    }

    @include largerThan($large) {
      margin-bottom: 0;

      &.with-infoPanel {
        flex: 1 1 50%;
        margin-right: 24px;
      }
    }

    span {
      display: inline-block;
    }
  }

  &-InfoPanel {
    flex: 1 1 50%;
  }

  &-DataSetPanel {
    flex: 1 0 auto;
    width: 100%;
  }

  &-Content {
    margin: 10px 0;
  }

  &-slider {
    margin: 10px 0;
  }

  &-Space {
    margin-top: 10px;
  }

  &-Description {
    margin-top: 10px;
    color: $gray-3;
    @include font-size(12);

    ul,
    ol {
      list-style: disc inside;
      padding-left: 1em;

      li {
        margin-left: 1.5em;
        text-indent: -1.5em;
      }
    }

    .ListStyleNone {
      list-style: none;
      padding-left: 0;

      li {
        margin-left: 0;
        text-indent: 0;
      }
    }

    &--Additional {
      margin-bottom: 10px;
    }
  }

  &-Details {
    margin: 10px 0;

    .v-data-table {
      .text-end {
        text-align: right;
      }
      .text-nowrap {
        white-space: nowrap;
      }
    }
  }

  &-ExpantionPanel {
    margin-bottom: 10px;
  }

  &-Footer {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    color: $gray-3;
    @include font-size(12);

    ul,
    ol {
      list-style-type: none;
      padding: 0;
    }

    .Permalink {
      color: $gray-3 !important;
    }

    .Footer-Right {
      display: flex;
      align-items: flex-end;
    }
  }

  &-AttentionNote {
    margin: 10px 0;
    padding: 12px;
    background-color: $emergency;
    border-radius: 4px;
    color: $gray-2;
    @include font-size(12);

    p {
      margin: 0;
    }
  }
}
</style>
