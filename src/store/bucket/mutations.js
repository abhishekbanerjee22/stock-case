import { updateField } from "vuex-map-fields";

import {
  SET_STOCK_LIST,
  ADD_STOCK,
  UPDATE_STOCK_PRICE
} from "./mutation-types";

export const mutations = {
  [SET_STOCK_LIST](state, payload) {
    state.searchResult = payload;
  },
  [ADD_STOCK](state, payload) {
    state.selected = { ...state.selected, [payload.symbol]: { ...payload } };
  },
  [UPDATE_STOCK_PRICE](state, payload) {
    state.selected = {
      ...state.selected,
      [payload.symbol]: {
        ...state.selected[payload.symbol],
        ...payload
      }
    };
  },
  updateField
};
