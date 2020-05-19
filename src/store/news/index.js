import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const state = {
  stock: "",
  bucketId: "",
  data: {
    neutral: [],
    positive: [],
    negative: []
  }
};

const namespaced = true;

export const news = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
