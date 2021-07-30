import path from 'path'
// scss内でのglob使用
import globImporter from 'node-sass-glob-importer'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  htmlAttrs: {
    lang: 'ja',
    prefix: 'og: http://ogp.me/ns#'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PADI オープンウォーター試験対策クイズ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: 'PADIオープンウォーター試験対策のクイズです' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'reset-css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-webfontloader'
  ],
  webfontloader: {
    google: {
      families: ['Noto+Sans']
    }
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // webpackのカスタマイズオプション
    // https://ja.nuxtjs.org/docs/2.x/configuration-glossary/configuration-build/#loaders
    loaders: {
      pugPlain: {},
      css: {},
      cssModules: {
        localIdentName: '[local]_[hash:base64:5]'
      },
      scss: {
        // sass(Dart Sass)の場合
        // implementation: require('sass'),
        implementation: require('node-sass'),
        sassOptions: {
          // scssないでglobが使用できるようにする
          importer: globImporter(),
          fiber: require('fibers')
        }
      }
    },
    extend (config) {
      // 相対パスが面倒なのでエイリアス追加
      config.resolve.alias['@style'] = path.resolve(__dirname, './assets/style/')
      config.resolve.alias['@js'] = path.resolve(__dirname, './assets/javascripts/')
      config.resolve.alias['@img'] = path.resolve(__dirname, './assets/img/')
      config.resolve.alias['@json'] = path.resolve(__dirname, './assets/json/')
    },
    terser: {
      terserOptions: {
        compress: {
          // 本番環境のみconsole.logを削除
          drop_console: true
        }
      }
    }
  }
}
