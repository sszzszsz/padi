<template>
  <div class="inr">
    <h1>間違えた問題一覧</h1>
    <div class="cont">
      <ul>
        <li
          v-for="(item, index) in RevengeList"
          :key="index"
          :data-q="`${index + 1}`"
        >
          <h3>Q{{ index + 1 }}</h3>
          <p class="location mb-1">
            <b-badge variant="info">
              SECTION{{ item.section }}
            </b-badge>
            <b-badge variant="info">
              PART{{ item.part }}
            </b-badge>
            <b-badge variant="info">
              第{{ item.num }}問目
            </b-badge>
          </p>
          <QuestionItem :question-data="item" @catchAnswer="changeAnswer" />
          <div>
            <b-button
              v-b-toggle="`collapse-${index}`"
              size="sm"
              :variant="`outline-dark`"
              class="check-btn"
            >
              <span>回答をチェック</span>
            </b-button>
          </div>
          <b-collapse :id="`collapse-${index}`" class="mt-4">
            <div v-if="correctFlag[index] === 'true'">
              <p>正解です。</p>
              <p>
                {{ item.comment }}
              </p>
            </div>
            <div v-else-if="correctFlag[index] === 'false'">
              <p>
                ハズレです。<br>
                正解は【{{ answerText[index] }}】です。
              </p>
              <p>
                {{ item.comment }}
              </p>
            </div>
            <div v-else-if="correctFlag[index] === 'null'">
              <p>選択されていません。</p>
            </div>
          </b-collapse>
        </li>
      </ul>

      <b-button
        block
        :variant="`outline-dark`"
        class="btn--link"
      >
        <NuxtLink :to="`/`">
          <span>TOPに戻る</span>
        </NuxtLink>
      </b-button>
    </div>
    <TheFooter :top="false" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      RevengeList: [],
      correctFlag: [],
      activeCorrectFlag: '',
      answerDispFlag: false,
      changeID: '',
      answerText: [],
      alphabets: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    }
  },
  computed: {},
  watch: {
    activeCorrectFlag (newValue, oldValue) {
      const THIS = this
      this.RevengeList.forEach((item, index) => {
        if (item.id === THIS.changeID) {
          THIS.correctFlag.splice(index, 1, newValue)
        }
      })
      console.log(this.correctFlag)
    },
    changeID (newValue, oldValue) {
      const THIS = this
      this.RevengeList.forEach((item, index) => {
        if (item.id === THIS.changeID) {
          THIS.correctFlag.splice(index, 1, THIS.activeCorrectFlag)
        }
      })
      console.log(this.correctFlag)
    }
  },
  mounted () {
    this.RevengeList = JSON.parse(localStorage.getItem('RevengeList'))
    for (let i = 0; i < this.RevengeList.length; i++) {
      this.correctFlag.push('null')
      this.getAnswerText(i)
    }
  },
  methods: {
    getAnswerText (i) {
      console.log('getAnswerText')
      const THIS = this
      let answerText
      // 回答が一つの場合
      if (!this.RevengeList[i].multi) {
        const answerId = this.RevengeList[i].answer
        this.alphabets.forEach((item, index) => {
          if (item === answerId) {
            answerText = THIS.RevengeList[i].select[index]
          }
        })
      } else {
        // 回答が複数の場合
        const answerId = this.RevengeList[i].answer.split(',')
        this.alphabets.forEach((item, index) => {
          if (answerId.includes(item)) {
            answerText = `${THIS.answerText}・${THIS.RevengeList[i].select[index]}`
          }
        })
      }
      this.answerText.push(answerText)
    },
    changeAnswer (str, data) {
      console.log('changeAnswer', str, data.id)
      this.activeCorrectFlag = str
      this.changeID = data.id
    },
    dispAnswer () {
      if (this.answerDispFlag === false) {
        this.answerDispFlag = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  background: #113d6b;
  color: #fff;
  font-size: 24px;
  padding: 20px 10px;
  margin: 0 auto 20px;
  width: 100%;
}
h3 {
  font-size: 18px;
  border-left: 6px solid #113d6b;
  padding: 0 0 4px 8px;
  margin: 20px auto 5px;
}
.location {
  font-size: 14px;
}
</style>
