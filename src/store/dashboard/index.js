import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const state = {
  list: {},
  mode: "bucket",
  graphs: {
    bucket: {
      focus: "",
      data: {}
    },
    stock: {
      focus: "",
      data: {}
    }
  }
};

const namespaced = true;

export const dashboard = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
