import {
  SET_BUCKETS,
  SET_FOCUS_BUCKET,
  SET_FOCUS_STOCK,
  SET_MODE,
  SET_BUCKET_GRAPH,
  SET_STOCK_GRAPH
} from "./mutation-types";
import { getBuckets, getBucketGraph, getStockGraph } from "@/utils/apis";

export const actions = {
  async getBuckets({ commit, state, dispatch }) {
    const { status, data } = await getBuckets();
    if (status === "success") {
      const reduced = data.reduce((acc, item) => {
        acc[item.bucket_id] = item;
        return acc;
      }, {});
      commit(SET_BUCKETS, reduced);
      dispatch("setFocusBucket", Object.keys(reduced)[0]);
    } else {
    }
  },
  async setFocusBucket({ commit, dispatch }, payload) {
    commit(SET_FOCUS_BUCKET, payload);
    commit(SET_MODE, "bucket");
    dispatch("setFocusStockExplicit", "");
  },
  async setFocusStockExplicit({ commit }, payload) {
    commit(SET_FOCUS_STOCK, payload);
  },
  async setFocusStock({ commit }, payload) {
    console.log("setFocusStock", payload);
    commit(SET_MODE, "stock");
    commit(SET_FOCUS_STOCK, payload);
  },
  async getBucketGraphRequest({ commit, dispatch }, payload) {
    const res = await getBucketGraph(payload);
    commit(SET_BUCKET_GRAPH, { data: res.data, bucketId: payload });
  },
  async getStockGraphRequest({ commit, dispatch }, payload) {
    const res = await getStockGraph(payload);
    commit(SET_STOCK_GRAPH, { data: res.data, stock: payload });
  }
};
