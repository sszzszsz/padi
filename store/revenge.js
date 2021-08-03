// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  pageName: '',
  revengeList: []
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  setPageName (state, value) {
    state.pageName = value
  },
  setRevengeList (state, value) {
    state.revengeList.push(value)
    // ローカルストレージに保存する
    const storage = localStorage
    storage.setItem('RevengeList', JSON.stringify(state.revengeList))
  }
}

// 実際に各コンポーネントから呼び出す処理をactionとしてexportする
export const actions = {
  writePageName (context, value) {
    // コミットすることで状態変更が反映される
    context.commit('setPageName', value)
  },
  writeRevengeList (context, value) {
    // コミットすることで状態変更が反映される
    context.commit('setRevengeList', value)
  }
}

// storeからの取得
export const getters = {
  getRevengeList (state) {
    return state.revengeList
  }
}
