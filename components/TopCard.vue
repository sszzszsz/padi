<template>
  <b-card :header="`${ttl}`" :class="section" variant="info">
    <!-- <b-card
    :header="`${ttl}`"
    :border-variant="color"
    :class="section"
  > -->
    <div>
      <b-card-text class="tc__sum">
        合計：{{ sectionLen }}問
      </b-card-text>
      <b-button block :variant="`info`" class="tc__section-btn btn--link">
        <NuxtLink :to="`/${section}/part1/1`">
          <span>はじめる</span>
        </NuxtLink>
      </b-button>

      <b-button
        v-b-toggle="section"
        :variant="`outline-info`"
        class="mt-3 pl-2 pr-2 tc__part-btn"
        size="sm"
      >
        <span>各パートごとにはじめる</span>
      </b-button>
      <b-collapse :id="section" class="pl-2 pr-2">
        <ul class="container pt-2">
          <li v-for="n in partLen" :key="n" class="mt-2">
            <NuxtLink :to="`/${section}/part${n}/1`" class="row tc__part-row">
              <span class="col-3 px-0"> パート{{ n }} </span>
              <span class="col-4 px-0">(合計：{{ partList[n].length }}問)</span>
              <span class="col text-right tc__part-link">
                はじめる
              </span>
            </NuxtLink>
          </li>
        </ul>
      </b-collapse>
    </div>
  </b-card>
</template>
<script>
export default {
  props: {
    ttl: {
      type: String,
      require: true,
      default: ''
    },
    section: {
      type: String,
      require: true,
      default: ''
    },
    sectionLen: {
      type: Number,
      require: true,
      default: 0
    },
    sectionData: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    color: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      partList: {},
      partLen: 0
    }
  },
  mounted () {
    const THIS = this
    this.sectionData.forEach((obj) => {
      // 各パートが何章まであるのか取得
      THIS.partLen = Math.max(THIS.partLen, obj.part)

      // 各パートごとに分ける
      if (!THIS.partList[`${obj.part}`]) {
        THIS.partList[`${obj.part}`] = []
      }
      THIS.partList[`${obj.part}`].push(obj)
    })
  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 0;
  a {
    position: relative;
    display: block;
    width: 100%;
    padding: 10px;
  }
}
.card {
  &-header {
    font-weight: bold;
    background: #123d6b;
    color: #fff;
  }
  &-body {
    position: relative;
  }
}
.tc {
  &__section-btn {
    a {
      &::after {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%) rotate(-45deg);
      }
    }
  }
  &__part-btn {
    span {
      display: inline-block;
      padding-right: 5px;
    }
    &::after {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      transform: translateY(-3px) rotate(45deg);
    }
  }
  &__part-row {
    font-size: 14px;
    padding: 2px 0 4px;
    border-bottom: 1px solid #ddd;
  }
  &__part-link {
    &::after {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      transform: translateY(-1px) rotate(-45deg);
    }
  }
  &__sum {
    position: absolute;
    top: -25px;
    right: 10px;
    font-size: 12px;
    color: #fff;
  }
}
</style>
