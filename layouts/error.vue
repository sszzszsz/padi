<template>
  <div class="inr">
    <div class="cont">
      <h1 class>
        404
      </h1>
      <p class="text-center">
        ページが見つかりません
      </p>
      <b-button
        block
        :variant="`outline-dark`"
        class="btn--link btn--home mt-5"
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
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/style/setting";

.inr {
  display: grid;
  min-height: 100vh;
  width: 100%;
  grid-template-rows: auto 110px;
}
h1 {
  font-size: 20vw;
  font-weight: bold;
  text-align: center;
  margin: 1em auto 15px;
  color: #000f7d;
  background: -webkit-linear-gradient(151deg, #000f7d, #86fde8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
