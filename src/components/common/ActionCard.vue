<template>
  <div
    class="w-full text-white text-2xl bg-blue-800 py-8 px-4 lg:py-8 lg:px-32"
    v-if="defaultOrNot"
  >
    <div class="flex flex-col lg:flex-row justify-between items-center">
      <div class="pb-8 md:pb-8 lg:pb-0">
        Create
        <input
          type="text"
          class="bg-transparent border-b-4 border-dashed border-gray-800 w-48 outline-none text-center lg:text-left"
          value="stockcase1"
          placeholder="Enter stock name"
        />
        <img
          src="@/assets/images/edit.png"
          alt="edit"
          class="inline-block w-4 ml-4"
        />
      </div>
      <stock-search />
    </div>
    <div
      class="flex flex-col lg:flex-row py-16 pb-8 items-center justify-between"
      v-if="Object.values(selected).length === 0"
    >
      <img
        src="@/assets/images/banner.png"
        alt="banner"
        class="w-64 md:w-1/2 lg:w-1/4 p-4"
      />
      <div class="pl-0 lg:pl-6 text-center md:text-left">
        <h1 class="text-4xl md:text-5xl lg:text-6xl leading-none p-0 m-0">
          Create and analyse your stockcase.
        </h1>
        <p class="pt-4 text-sm lg:text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p class="text-sm lg:text-2xl">Investing option coming soon...</p>
      </div>
    </div>
    <div class="py-16 text-center" v-else>
      <data-table
        :data="Object.values(selected)"
        :columnsToDisplay="
          innerWidth > 800 ? columnsToDisplay : columnsMobileDisplay
        "
        :displayNames="displayNames"
      >
        <template slot="sentiment" slot-scope="props">
          <div class="progress-bar">
            <span :style="`width: ${props.entry.bullPercent * 100}%`" />
          </div>
        </template>
        <template slot="change" slot-scope="props">
          <span
            :class="
              `${props.entry.change >= 0 ? 'text-green-550' : 'text-red-550'}`
            "
          >
            {{ props.entry.change }} %
          </span>
        </template>
      </data-table>
      <div class="mt-12">
        <sc-button text="Create" focused />
      </div>
    </div>
  </div>
  <div v-else class="w-full text-white text-2xl py-8 px-4 lg:py-4 lg:px-4">
    <div class="flex flex-row md:flex-column">
      <div class="bg-blue-800 flex-it-out">
        <graph />
      </div>
      <div class="bg-blue-800 px-6 py-4">
        <bucket-selector />
        <bucket-details />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.progress-bar {
  background-color: #f35b04;
  border-radius: 2px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25) inset;

  width: 100%;
  height: 16px;

  position: relative;
  display: block;
}

.flex-it-out {
  flex: 1;
}

.progress-bar span {
  background-color: #34d1bf;
  height: 100%;
  border-radius: 2px;

  display: block;
  text-indent: -9999px;
}
</style>

<script>
import { debounce } from "@/utils/debounce";
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";

import StockSearch from "@/components/common/StockSearch";
import DataTable from "@/components/common/DataTable";
import ScButton from "@/components/common/Button";

import BucketSelector from "@/components/dashboard/BucketSelector";
import BucketDetails from "@/components/dashboard/BucketDetails";
import Graph from "@/components/dashboard/Graph";

const { mapFields } = createHelpers({
  getterType: "bucket/getField",
  mutationType: "bucket/updateField"
});

const { mapFields: mapDashboardFields } = createHelpers({
  getterType: "dashboard/getField",
  mutationType: "dashboard/updateField"
});

const { mapFields: mapUserFields } = createHelpers({
  getterType: "user/getField",
  mutationType: "user/updateField"
});

export default {
  components: {
    StockSearch,
    DataTable,
    ScButton,
    BucketSelector,
    BucketDetails,
    Graph
  },
  data: function() {
    return {
      innerWidth: window.innerWidth,
      columnsToDisplay: [
        "companyName",
        "symbol",
        "price",
        "change",
        "sentiment"
      ],
      columnsMobileDisplay: ["symbol", "sentiment"],
      displayNames: {
        companyName: "Company",
        symbol: "Symbol",
        price: "Price $",
        change: "Change",
        sentiment: "Sentiment"
      }
    };
  },
  mounted() {
    if (this.email) {
      this.getBuckets();
    }
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
  },
  methods: {
    ...mapActions("dashboard", ["getBuckets"])
  },
  computed: {
    ...mapFields({
      selected: "selected",
      searchResult: "searchResult"
    }),
    ...mapDashboardFields({
      list: "list"
    }),
    ...mapUserFields({
      userLoading: "activity.loading",
      email: "details.email"
    }),
    defaultOrNot: function() {
      const path = this.$router.history.current.path;
      return path !== "/dashboard" || this.type === "create";
    }
  },
  watch: {
    userLoading: function() {
      if (this.userLoading === false) {
        if (this.email) {
          this.getBuckets();
        }
      }
    }
  }
};
</script>
