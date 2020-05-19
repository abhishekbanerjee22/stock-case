<template>
  <div class="bg-blue-900 px-2 py-4 mt-2">
    <div class="bg-blue-800 px-2 py-2 text-center text-xl">
      {{ bucket.bucket_name || "Loading" }}
    </div>
    <div class="text-xs text-gray-300 flex justify-between p-2">
      <div>Stocks</div>
      <div>Price</div>
    </div>
    <div class="h-32 overflow-scroll">
      <div v-for="item in bucket.bucket_stocks" :key="item.id">
        <div
          :class="
            `${item.symbol === stockFocus &&
              'bg-blue-800'} text-sm flex justify-between p-2 hover:bg-blue-800`
          "
          @click="() => selectStock(item.symbol)"
        >
          <div>{{ item.symbol }}</div>
          <div class="text-primary-900">{{ item.price }} $</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";
import ClickOutside from "vue-click-outside";

const { mapFields } = createHelpers({
  getterType: "dashboard/getField",
  mutationType: "dashboard/updateField"
});
export default {
  computed: {
    ...mapFields({
      list: "list",
      stockFocus: "graphs.stock.focus",
      bucketFocus: "graphs.bucket.focus"
    }),
    bucket: function() {
      return this.list[this.bucketFocus] || { bucket_stocks: [] };
    }
  },
  methods: {
    ...mapActions("dashboard", ["setFocusStock"]),
    selectStock: function(stock) {

      this.setFocusStock(stock);
    }
  }
};
</script>
