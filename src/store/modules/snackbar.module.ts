const state = {
  snackbar: {
    status: false,
    type: "success",
    title: null,
    message: "This is the snackbar",
  },
};

const actions = {
  setSnackbarAction({commit}: {commit: Function}, payload: any) {
    commit("setSnackbar", payload);
  },
};

const mutations = {
  setSnackbar(state: any, payload: any) {
    const snackBar: any = payload;
    if (!snackBar?.timeout) {
      snackBar.timeout = 3000;
    }
    state.snackbar = snackBar;
  },
};

export const snackbar = {
  namespaced: true,
  state,
  actions,
  mutations,
};
