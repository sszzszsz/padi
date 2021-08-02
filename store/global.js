// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  pageName: '',
  missList: []
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  setPageName (state, value) {
    state.pageName = value
  },
  setMissList (state, value) {
    state.missList.push(value)
  }
}

// 実際に各コンポーネントから呼び出す処理をactionとしてexportする
export const actions = {
  writePageName (context, value) {
    // コミットすることで状態変更が反映される
    context.commit('setPageName', value)
  },
  writeMissList (context, value) {
    // コミットすることで状態変更が反映される
    context.commit('setMissList', value)
  }
}
