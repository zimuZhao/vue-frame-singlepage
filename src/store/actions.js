const makeAction = type => {
  return ({commit}, ...args) => commit(type, ...args)
}

export const setMenu = makeAction('SET_MENU_STORE')
export const setUserInfo = makeAction('SET_USERINFO_STORE')
