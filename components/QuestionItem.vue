<template>
  <div>
    <div v-if="questionData.img" class="img">
      <img :src="requireImg(questionData.img)" alt="">
    </div>
    <p>{{ questionData.question }}</p>
    <!-- 複数回答のとき -->
    <div v-if="questionData.multi === 'true'">
      <b-form-checkbox-group v-model="selecteds">
        <ul class="select_list">
          <li v-for="(select, i) in questionData.select" :key="select.id">
            <b-form-checkbox
              class="select_btn"
              :value="alphabets[i]"
              :class="i"
              :data-text="select"
              @change="chekckAnswer()"
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
          <li v-for="(select, i) in questionData.select" :key="select.id">
            <b-form-radio
              v-model="selected"
              class="select_btn"
              :value="alphabets[i]"
              :class="i"
              :data-text="select"
              @change="chekckAnswer()"
            >
              {{ select }}
            </b-form-radio>
          </li>
        </ul>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionData: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      selecteds: [],
      selected: '',
      alphabets: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      answerList: [],
      correctFlag: 'false'
    }
  },
  methods: {
    requireImg (file) {
      return require(`~/assets/img/${file}`)
    },
    chekckAnswer () {
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
        this.answerList = this.questionData.answer.split(',')
        const temp = []
        if (this.selecteds.length > 0) {
          this.selecteds.forEach((item) => {
            temp.push(THIS.answerList.includes(item))
          })
        }
        this.correctFlag =
          this.selecteds === ''
            ? 'null'
            : temp.includes(false)
              ? 'false'
              : temp.length === this.answerList.length
                ? 'true'
                : 'false'
      }

      this.$emit('catchAnswer', this.correctFlag, this.questionData)
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}
.select_list {
  li {
    margin-bottom: 8px;

    /deep/.custom-control-label {
      padding: 5px 0;
      cursor: pointer;
      &:before,
      &:after {
        top: 0.55rem;
      }
    }
  }
}
</style>
