import {
  SET_STOCK_LIST,
  ADD_STOCK,
  UPDATE_STOCK_PRICE
} from "./mutation-types";
import { searchStocks, getStockPrice } from "@/utils/apis";

export const actions = {
  async getStocksData({ commit, state }) {
    const { search } = state;
    const { status, data } = await searchStocks(search);
    if (status === "success") {
      commit(SET_STOCK_LIST, data);
    } else {
    }
  },
  async addStock({ commit, state }, payload) {
    const valid = !state.selected[payload.symbol];
    if (valid) {
      commit(ADD_STOCK, payload);
      const res = await getStockPrice(payload.symbol);
      commit(UPDATE_STOCK_PRICE, res);
    }
  }
};
