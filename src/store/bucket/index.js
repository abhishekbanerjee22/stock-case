import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const state = {
  search: "",
  searchResult: {},
  selected: {}
};

const namespaced = true;

export const bucket = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
