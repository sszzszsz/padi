<template>
  <ul class="bubble-wrap">
    <li
      v-for="n in 100"
      :key="n"
      class="bubble"
      :class="`move${Math.ceil(Math.random() * 50)} pos${Math.ceil(Math.random() * 50)}`"
    >
      <span :class="`stretch${Math.ceil(Math.random() * 5)}`">
        <span class="bubble-inr" :class="`shake${Math.ceil(Math.random() * 5)}`">
          <span :class="`scale${Math.ceil(Math.random() * 10)}`" />
        </span>
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.bubble-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.bubble-inr {
  span {
    position: relative;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.6) inset;
    &:after {
      content: "";
      display: block;
      width: 20%;
      height: 20%;
      border-radius: 100%;
      background: rgba(255, 255, 255, 0.6);
      position: absolute;
      right: 15%;
      top: 15%;
      transform: rotateZ(45deg) scaleY(0.8);
      -webkit-transform: rotateZ(45deg) scaleY(0.8);
    }
  }
}
/* 伸縮 */
@keyframes stretch {
  0% {
    transform: scaleX(1) scaleY(1);
  }
  33% {
    transform: scaleX(0.9) scaleY(1);
  }
  66% {
    transform: scaleX(1) scaleY(0.9);
  }
  100% {
    transform: scaleX(1) scaleY(1);
  }
}

/* 横揺れ */
@keyframes shake {
  0% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(10px);
  }
}

/* 移動 */
@keyframes move {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-1000px);
    opacity: 0;
  }
}

/*** 泡のアニメーションパターン量産(SCSS) ***/
@for $i from 0 through 100 {
  $time: $i * 0.5;
  $scale: $i * 0.15;

  /* 横揺れスピード */
  .shake#{$i * 1} {
    animation: shake ($time + 2) + s ease 0s infinite normal;
  }

  /* 伸縮 */
  .stretch#{$i * 1} {
    animation: stretch ($time + 1) + s ease 0s infinite normal;
  }

  /* 移動スピード */
  .move#{$i * 1} {
    animation: move ($time + 5) + s ease $time + s infinite normal;
    position: absolute;
    bottom: -10%;
  }

  /* 配置 */
  .pos#{$i * 1} {
    left: percentage($i * 2/100);
  }
  /* 大きさ */
  .scale#{$i * 1} {
    transform: scale($scale);
  }

}
</style>
