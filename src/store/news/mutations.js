import { updateField } from "vuex-map-fields";

import { SET_NEWS, SET_BUCKET_ID, SET_STOCK } from "./mutation-types";

export const mutations = {
  [SET_STOCK](state, payload) {
    state.stock = payload;
  },
  [SET_BUCKET_ID](state, payload) {
    state.bucketId = payload;
  },
  [SET_NEWS](state, payload) {
    state.data = payload;
  },
  updateField
};
