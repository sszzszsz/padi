module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // セミコロンは禁止
    semi: [2, 'never'],
    // コンソールは許可
    'no-console': 0,
    // 関数とカッコはあけない(function hoge() {/** */})
    'func-call-spacing': [2, 'never']
  }
}
