import { updateField } from "vuex-map-fields";

import {
  SET_BUCKETS,
  SET_FOCUS_STOCK,
  SET_FOCUS_BUCKET,
  SET_MODE,
  SET_BUCKET_GRAPH,
  SET_STOCK_GRAPH
} from "./mutation-types";

export const mutations = {
  [SET_BUCKETS](state, payload) {
    state.list = { ...state.list, ...payload };
  },
  [SET_FOCUS_BUCKET](state, payload) {
    state.graphs.bucket.focus = payload;
  },
  [SET_FOCUS_STOCK](state, payload) {
    state.graphs.stock.focus = payload;
  },
  [SET_MODE](state, payload) {
    state.mode = payload;
  },
  [SET_BUCKET_GRAPH](state, payload) {
    state.graphs.bucket.data = {
      ...state.graphs.bucket.data,
      [payload.bucketId]: {
        ...state.graphs.bucket.data[payload.bucketId],
        ...payload.data
      }
    };
  },
  [SET_STOCK_GRAPH](state, payload) {
    state.graphs.stock.data = {
      ...state.graphs.stock.data,
      [payload.stock]: {
        ...state.graphs.stock.data[payload.stock],
        ...payload.data
      }
    };
  },
  updateField
};
