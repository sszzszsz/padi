<template>
  <div class="inr" :class="`${$route.params.section}`">
    <h1>
      <span class="ttl-inr">
        <span>SECTION {{ questionData.section }}</span>
        <span class="part">PART {{ questionData.part }}</span>
      </span>
    </h1>
    <main class="cont">
      <p class="progress_txt">
        {{ partData.length }}問中 {{ $route.params.id }}問目
      </p>
      <div class="container">
        <ul class="progress_list row">
          <li
            v-for="n in partData.length"
            :key="n"
            class="col px-0"
            :class="n <= questionData.num ? 'is-active' : ''"
          >
            {{ n }}
            <IconFish />
          </li>
        </ul>
      </div>

      <h3>Q{{ questionData.num }}</h3>
      <div v-if="questionData.img" class="img">
        <img :src="requireImg(questionData.img)" alt="">
      </div>
      <p>{{ questionData.question }}</p>

      <!-- 複数回答のとき -->
      <div v-if="questionData.multi === 'true'">
        <b-form-checkbox-group v-model="selecteds">
          <ul class="select_list">
            <li v-for="(select, index) in questionData.select" :key="select.id">
              <b-form-checkbox
                class="select_btn"
                :value="alphabets[index]"
                :class="index"
                :data-text="select"
              >
                {{ select }}
              </b-form-checkbox>
            </li>
          </ul>
        </b-form-checkbox-group>
      </div>

      <!-- 単数回答のとき -->
      <div v-else>
        <b-form-group>
          <ul class="select_list">
            <li v-for="(select, index) in questionData.select" :key="select.id">
              <b-form-radio
                v-model="selected"
                class="select_btn"
                :value="alphabets[index]"
                :class="index"
                :data-text="select"
                @change="chekckAnsswer()"
              >
                {{ select }}
              </b-form-radio>
            </li>
          </ul>
        </b-form-group>
      </div>

      <b-button
        block
        :variant="`outline-dark`"
        class="check-btn"
        @click="chekckAnsswer(), dispAnswer()"
      >
        <span>回答をチェック</span>
      </b-button>

      <div v-if="answerDispFlag" class="pt-3">
        <div v-if="correctFlag === 'true'">
          <p>正解です。</p>
          <p class="mt-2">
            {{ questionData.comment }}
          </p>
        </div>
        <div v-else-if="correctFlag === 'false'">
          <p>
            ハズレです。<br>
            正解は【{{ answerText }}】です。
          </p>
          <p class="mt-2">
            {{ questionData.comment }}
          </p>
        </div>
        <div v-else-if="correctFlag === 'null'">
          <p>選択されていません。</p>
        </div>
      </div>

      <div class="container mt-5 btn-list">
        <div class="row justify-content-center">
          <b-button :variant="`outline-dark`" class="col-4">
            <NuxtLink :to="getPrevLink()">
              <span>前へ</span>
            </NuxtLink>
          </b-button>
          <b-button :variant="`outline-dark`" class="col-4">
            <NuxtLink :to="getNextLink()">
              <span>次へ</span>
            </NuxtLink>
          </b-button>
        </div>
      </div>
    </main>

    <TheFooter :top="false" />
  </div>
</template>

<script>
import dataList from '~/assets/json/oepnwater.json'
export default {
  data () {
    return {
      data: dataList,
      sectionList: [],
      sectionLen: 0,
      partList: {},
      partData: [],
      partLen: 0,
      questionData: {},
      selecteds: [],
      selected: '',
      alphabets: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      correctFlag: 'false',
      answerDispFlag: false,
      answerText: '',
      counter: 0
    }
  },
  computed: {},
  created () {
    this.getPartData()
    this.getquestionData()
  },
  mounted () {
    this.getText()
  },
  methods: {
    getPartData () {
      const THIS = this
      const sectionNum = this.$route.params.section.replace('section', '')
      this.sectionList = this.data.filter((item) => {
        THIS.sectionLen = Math.max(THIS.sectionLen, Number(item.section))
        return item.section === String(sectionNum)
      })

      this.sectionList.forEach((obj) => {
        // 各パートが何章まであるのか取得
        THIS.partLen = Math.max(THIS.partLen, obj.part)

        // 各パートごとに分ける
        if (!THIS.partList[`${obj.part}`]) {
          THIS.partList[`${obj.part}`] = []
        }
        THIS.partList[`${obj.part}`].push(obj)
      })
    },
    getquestionData () {
      const THIS = this
      const partNum = Number(this.$route.params.part.replace('part', ''))
      this.partData = this.partList[partNum]
      this.questionData = this.partData.filter((data) => {
        return data.num === String(THIS.$route.params.id)
      })
      this.questionData = this.questionData[0]
    },
    hideAnswer () {
      this.answerDispFlag = false
    },
    dispAnswer () {
      if (this.answerDispFlag === false) {
        this.answerDispFlag = true
      }
    },
    getText () {
      console.log('getText')
      const answerId = this.questionData.answer
      const btnList = document.querySelectorAll('.select_btn > input')
      btnList.forEach((item) => {
        if (item.getAttribute('value') === answerId) {
          this.answerText = item.getAttribute('data-text')
        }
      })
    },
    requireImg (file) {
      return require(`~/assets/img/${file}`)
    },
    countClick () {
      this.counter += 1
    },
    chekckAnsswer () {
      console.log('chekckAnsswer')
      const THIS = this
      // 回答が一つの場合
      if (!this.questionData.multi) {
        this.correctFlag =
          this.selected === this.questionData.answer
            ? 'true'
            : this.selected === ''
              ? 'null'
              : 'false'
      } else {
        // 回答が複数の場合
        this.questionData.answerList = this.questionData.answer.split(',')
        const temp = []
        if (this.selecteds.length > 0) {
          this.selecteds.forEach((item) => {
            temp.push(THIS.questionData.answerList.includes(item))
          })
        }
        this.correctFlag =
          this.selecteds === ''
            ? 'null'
            : temp.includes(false)
              ? 'false'
              : temp.length === this.questionData.answerList.length
                ? 'true'
                : 'false'
      }
    },
    getPrevLink () {
      console.log('getPrevLink')
      let section = Number(this.$route.params.section.replace('section', ''))
      let part = Number(this.$route.params.part.replace('part', ''))
      let num = Number(this.$route.params.id)

      if (this.$route.params.id <= 1) {
        if (part <= 1) {
          if (section < 1) {
            section = 0
          } else {
            section -= 1
          }
          part = 1
        } else {
          part -= 1
        }
        num = 1
      } else {
        num = num - 1
      }
      return `/section${section}/part${part}/${num}`
    },
    getNextLink () {
      let section = Number(this.$route.params.section.replace('section', ''))
      let part = Number(this.$route.params.part.replace('part', ''))
      let num = Number(this.$route.params.id)
      // 今の問題数を比較
      if (this.$route.params.id >= this.partList[part].length) {
        num = 1

        if (!this.partList[part + 1]) {
          // 次のパートが無い場合、１に戻る
          part = 1
          if (section >= this.sectionLen) {
            section = 0
          } else {
            section += 1
          }
        } else {
          part = part + 1
        }
      } else {
        num = num + 1
      }
      return `/section${section}/part${part}/${num}`
    }
  }
}
</script>

<style lang="scss" scoped>
.inr {
  display: grid;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  grid-template-rows: 120px auto 110px;
}
.progress {
  &_txt {
    font-size: 14px;
    margin: 0;
  }
  &_list {
    li {
      font-size: 0;
      margin: 0 3px;
      max-width: 34px;
      text-align: center;
      /deep/ path {
        fill: #a1a1a1;
      }
      &.is-active {
        // background: #123d6b;
        /deep/ path {
          fill: #123d6b;
        }
      }
    }
  }
}
.section0 {
  h1 {
    background: var(--primary);
    background: url("~@/assets/img/bg_section0.jpeg") no-repeat;
    background-size: cover;
    background-position: 0% 100%;
    &:after {
      background: #69b1ff;
      opacity: 0.4;
    }
  }
}
.section1 {
  h1 {
    background: var(--primary);
    background: url("~@/assets/img/bg_section1.jpeg") no-repeat;
    background-size: cover;
    background-position: center right;
    &:after {
      background: #000;
      opacity: 0.4;
    }
  }
}
.section2 {
  h1 {
    background: var(--primary);
    background: url("~@/assets/img/bg_section2.jpeg") no-repeat;
    background-size: cover;
    background-position: 40% 60%;
    &:after {
      background: #171b52;
      opacity: 0.4;
    }
  }
}
.section3 {
  h1 {
    background: var(--primary);
    background: url("~@/assets/img/bg_section3.jpeg") no-repeat;
    background-size: cover;
    background-position: 40% 60%;
    &:after {
      background: #171b52;
      opacity: 0.4;
    }
  }
}
.section4 {
  h1 {
    background: var(--primary);
    background: url("~@/assets/img/bg_section4.jpeg") no-repeat;
    background-size: cover;
    background-position: 0% 50%;
    &:after {
      background: #1f4354;
      opacity: 0.4;
    }
  }
}
.section5 {
  h1 {
    background: var(--primary);
    background: url("~@/assets/img/bg_section5.jpeg") no-repeat;
    background-size: cover;
    background-position: 40% 60%;
    &:after {
      background: #1f4354;
      opacity: 0.4;
    }
  }
}
h1 {
  position: relative;
  background: #263254;
  color: #fff;
  font-size: 28px;
  padding: 20px 10px;
  margin: 0 auto 20px;
  width: 100%;
  .part {
    font-size: 60%;
    display: block;
    margin-top: 5px;
    position: relative;
    z-index: 2;
  }
  .ttl-inr {
    display: block;
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    font-weight: bold;
    filter: drop-shadow(1px 3px 5px #555);
  }
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
    background: #000;
    opacity: 0.4;
  }
}

h3 {
  font-size: 18px;
  border-left: 6px solid #113d6b;
  padding: 0 0 4px 8px;
  margin: 20px auto;
}

.select_list {
  li {
    margin-bottom: 8px;
  }
}
.img {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}
.check-btn {
  padding: 15px;
  max-width: 500px;
  margin: 0 auto;
  &:hover {
    background: inherit;
    color: inherit;
  }
}
.btn-list {
  button {
    padding: 0;
    margin: 0 10px;
    width: 150px;
    max-width: 200px;
    &:hover {
      background: inherit;
      color: inherit;
    }
    a {
      position: relative;
      display: block;
      width: 100%;
      padding: 10px;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
