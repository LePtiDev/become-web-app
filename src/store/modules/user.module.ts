import axios from 'axios'

const state = {
  user_data: {}
};

const actions = {
  setUser({commit}: {commit: Function}, payload: any) {
    commit("setUser", payload);
  },
};

const mutations = {
  setUser(state: any, payload: any) {
    console.log("set")
    state.user_data = payload;
  },
};

export const user = {
  namespaced: true,
  state,
  mutations,
  actions,
};
