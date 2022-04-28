import axios from "axios";

const state = {
  userData: {},
};

const actions = {
  setUserDataAction({ commit }: { commit: Function }, payload: any) {
    commit("setUserData", payload);
  },
};

const mutations = {
  setUserData(state: any, payload: any) {
    state.userData = payload;
  },
};

export const user = {
  namespaced: true,
  state,
  mutations,
  actions,
};
