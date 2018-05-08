import _ from 'lodash'
import * as types from '../mutation-types'

const state = {
  user: {},
  menu: [],
}

const mutations = {
  [types.SET_MENU_STORE] (state, params) {
    state.menu = _.clone(params)
  },
  [types.SET_USERINFO_STORE] (state, params) {
    state.user = _.clone(params)
  },
}

export default {
  state,
  mutations,
}
