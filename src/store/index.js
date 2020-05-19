// index.ts
import Vue from "vue";
import Vuex from "vuex";

import { user } from "@/store/user/index";
import { news } from "@/store/news/index";
import { bucket } from "@/store/bucket/index";
import { dashboard } from "@/store/dashboard/index";

Vue.use(Vuex);

const store = {
  state: {
    version: "1.0.0"
  },
  modules: {
    user,
    news,
    bucket,
    dashboard
  }
};

export default new Vuex.Store(store);
