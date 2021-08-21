<template>
  <footer class="footer">
    <div class="footer-link">
      <div>
        <a
          href="https://www.padi.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
          class="logo"
        >
          <img src="~/assets/img/padi-logo.png" alt="PADI">
        </a>
        <a
          href="https://sea-drop.net/hayamadivers/"
          target="_blank"
          rel="noopener noreferrer"
          class="logo hayama"
        >
          <img src="~/assets/img/logo_hayama_divers.png" alt="">
        </a>
      </div>
      <NuxtLink v-if="!top" :to="`/`" class="top">
        <span>TOP</span>
      </NuxtLink>
    </div>

    <p><small>@2021 suzu nagano</small></p>
  </footer>
</template>
<script>
export default {
  props: {
    top: {
      type: Boolean,
      require: true,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  // position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 10px;
  margin-top: 40px;
  text-align: center;
  background: #113d6b;
  color: #fff;
  &-link {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  a {
    display: inline-block;
    color: #fff;
    text-decoration: underline;
    font-size: 12px;
  }
  .logo {
    width: 90px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .hayama {
    margin-left: 10px;
    background: #fff;
    width: 100px;
    padding: 5px;
  }
  .top {
    padding-left: 20px;
    background: url(~@/assets/img/icon_home.svg) no-repeat;
    background-size: contain;
    text-decoration: none;
  }
  p {
    margin: 8px 0 0 0;
    font-size: 10px;
  }
}
</style>
