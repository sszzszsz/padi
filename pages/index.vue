<template>
  <div class="inr">
    <div class="main">
      <h1>
        PADI
        <span>- open water試験対策 -</span>
      </h1>
      <div class="cont">
        <ul class="card-list">
          <li>
            <TopCard
              ttl="Introduction"
              section="section0"
              :section-len="getSectionLen('section0')"
              :section-data="sectionList['section0']"
              color="dark"
            />
          </li>
          <li>
            <TopCard
              ttl="SECTION 1"
              section="section1"
              :section-len="getSectionLen('section1')"
              :section-data="sectionList['section1']"
              color="primary"
            />
          </li>
          <li>
            <TopCard
              ttl="SECTION 2"
              section="section2"
              :section-len="getSectionLen('section2')"
              :section-data="sectionList['section2']"
              color="info"
            />
          </li>
          <li>
            <TopCard
              ttl="SECTION 3"
              section="section3"
              :section-len="getSectionLen('section3')"
              :section-data="sectionList['section3']"
              color="success"
            />
          </li>
          <li>
            <TopCard
              ttl="SECTION 4"
              section="section4"
              :section-len="getSectionLen('section4')"
              :section-data="sectionList['section4']"
              color="warning"
            />
          </li>
          <li>
            <TopCard
              ttl="SECTION 5"
              section="section5"
              :section-len="getSectionLen('section5')"
              :section-data="sectionList['section5']"
              color="danger"
            />
          </li>
          <li>
            <TopCard
              ttl="間違えた問題"
              section="end"
              :section-len="getSectionLen('section5')"
              :section-data="sectionList['section5']"
              color="danger"
            />
          </li>
        </ul>
      </div>
    </div>
    <TheFooter :top="true" />
    <TheBubble />
  </div>
</template>

<script>
import dataList from '~/assets/json/oepnwater.json'
export default {
  data () {
    return {
      data: dataList,
      sectionList: {},
      partList: {},
      partLen: 0
    }
  },
  created () {
    this.getSectionData()
  },
  mounted () {},
  methods: {
    getSectionLen (section) {
      return this.sectionList[section].length
    },
    getSectionData () {
      const THIS = this
      for (let i = 0; i < 6; i++) {
        let secItems = this.data.filter((item) => {
          return item.section === String(i)
        })
        THIS.sectionList[`section${i}`] = secItems
        secItems = []
      }
    },
    getPartData () {
      const THIS = this
      this.sectionList.forEach((obj) => {
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
}
</script>

<style lang="scss" scoped>
@import "../assets/style/setting";
.inr {
  background: linear-gradient(0deg, #2562a0, #12a8c5);
  padding: 0px 0 0px;
  &:after {
    content: "";
    display: block;
    width: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    background: linear-gradient(55deg, #001d3a8f, #d2e3e680);
    opacity: 0.4;
  }
}
.main,
footer {
  position: relative;
  z-index: 2;
}
h1 {
  margin-bottom: 20px;
  color: #123d6b;
  background: #ffffff80;
  padding: 10px;
  text-shadow: 0px 0px 1px #daebff;
  span {
    font-size: 50%;
  }
}

ul {
  @include mq {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  li {
    margin: 20px auto;
    @include mq {
      min-width: 450px;
    }
  }
}
</style>
