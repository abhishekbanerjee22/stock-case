import { SET_NEWS, SET_BUCKET_ID, SET_STOCK } from "./mutation-types";
import { getStockData, getBucketNews } from "@/utils/apis";

export const actions = {
  async getNews({ commit, state }) {
    let res;
    console.log("Dispatching news");
    const { bucketId, stock } = state;
    if (bucketId) {
      console.log("Found bucket id");
      res = await getBucketNews(bucketId);

      console.log("Found bucketnews res", res);
    } else if (stock) {
      console.log("Found stock", stock);
      res = await getStockData(stock);
      console.log("Found res", res);
    } else {
      res = await getStockData();
    }
    const { status, data } = res;
    if (status === "success") {
      const seen = {};
      const news = data
        .filter(function(item) {
          return seen.hasOwnProperty(item.headline)
            ? false
            : (seen[item.headline] = true);
        })
        .reduce(
          (acc, item) => {
            if (item.sentiment === 0) {
              acc.neutral.push(item);
            } else if (item.sentiment > 0) {
              acc.positive.push(item);
            } else {
              acc.negative.push(item);
            }
            return acc;
          },
          { neutral: [], positive: [], negative: [] }
        );
      commit(SET_NEWS, news);
    } else {
    }
  },
  setStock({ commit, dispatch }, payload) {
    commit(SET_STOCK, payload);
    commit(SET_BUCKET_ID, "");
    console.log("Set stock id");
    dispatch("getNews");
  },
  setBucketId({ commit, dispatch }, payload) {
    commit(SET_BUCKET_ID, payload);
    commit(SET_STOCK, payload);
    console.log("SET BUCKET ID");
    dispatch("getNews");
  }
};
