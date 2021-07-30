<template>
  <div class="inr">
    <div>
      <div class="cont">
        <h1>
          PADI
          <span>~open water~</span>
        </h1>
        <ul>
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
        </ul>
      </div>
    </div>
    <TheFooter :top="true" />
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
.inr {
  background: url(~@/assets/img/9030156.jpeg) no-repeat;
  background-size: cover;
  padding: 10px 0 0px;
  background-position: 80% 100%;
}
h1 {
  margin-bottom: 20px;
  color: #123d6b;
  text-shadow: 0px 0px 1px #daebff;
  span {
    font-size: 50%;
  }
}

ul {
  li {
    margin-bottom: 20px;
  }
}
</style>
