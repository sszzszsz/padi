<template>
  <div class="inr">
    <div class="ttl__page">
      <h1 class="ttl__page-inr">
        間違えた問題一覧
      </h1>
    </div>
    <div class="cont">
      <ul v-if="RevengeList" class="revenge-list">
        <li
          v-for="(item, index) in RevengeList"
          :key="index"
          :data-q="`${index + 1}`"
        >
          <div class="container">
            <div class="row align-items-end">
              <h2 class="col ttl__sec">
                Q{{ index + 1 }}
              </h2>
              <b-button
                class="col-2"
                size="sm"
                :variant="`secondary`"
                @click="deleteQuestion(item.id)"
              >
                削除
              </b-button>
            </div>
          </div>
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

      <div v-else class="mb-3">
        問題がありません
      </div>

      <b-button block :variant="`outline-dark`" class="btn--link btn--home mt-5">
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
    },
    changeID (newValue, oldValue) {
      const THIS = this
      this.RevengeList.forEach((item, index) => {
        if (item.id === THIS.changeID) {
          THIS.correctFlag.splice(index, 1, THIS.activeCorrectFlag)
        }
      })
    }
  },
  mounted () {
    this.RevengeList = JSON.parse(localStorage.getItem('RevengeList'))
    if (this.RevengeList) {
      for (let i = 0; i < this.RevengeList.length; i++) {
        this.correctFlag.push('null')
        this.getAnswerText(i)
      }
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
    /**
     * @description 子コンポーネントから発火されたイベント
     * @param {String} str
     * @param {Object} data
     */
    changeAnswer (str, data) {
      console.log('changeAnswer', str, data.id)
      this.activeCorrectFlag = str
      this.changeID = data.id
    },
    /**
     * @description 削除ボタン押下イベント
     * @param {String} id
     */
    deleteQuestion (id) {
      console.log(id)
      const tempList = this.RevengeList
      this.RevengeList.forEach((item, index) => {
        if (item.id === id) {
          tempList.splice(index, 1)
        }
      })
      this.RevengeList = tempList
      localStorage.setItem('RevengeList', JSON.stringify(this.RevengeList))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/setting";

.inr {
  display: grid;
  min-height: 100vh;
  width: 100%;
  grid-template-rows: 100px auto 110px;
}
h1 {
  font-size: 24px;
}
.container {
  max-width: 100%;
  @include mq {
    max-width: 1000px;
    margin: 0 auto;
  }
}
.revenge-list {
  li + li {
    margin-top: 10px;
  }
}
.location {
  font-size: 14px;
}
.btn--home {
  max-width: 400px;
  margin: 0 auto;
}
</style>
