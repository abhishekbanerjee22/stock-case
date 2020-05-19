<template>
  <div class="relative">
    <div
      class="w-64 text-center bg-blue-900 py-2 cursor-pointer"
      @click="show = !show"
    >
      portfolio ^
    </div>
    <div
      class="absolute top-0 dropdown bg-blue-900 py-4 left-0 right-0"
      v-if="show"
      v-click-outside="close"
    >
      <div
        class="text-sm text-gray-300 flex px-4 pb-3 justify-between items-center"
      >
        <div>Stockcases</div>
        <div>Stocks</div>
      </div>
      <div class="text-base h-44 overflow-scroll">
        <div
          class="flex justify-between px-4 py-2 cursor-pointer hover:bg-blue-800"
          v-for="item in Object.values(list)"
          :key="item.bucket_id"
          @click="() => bucketSelect(item.bucket_id)"
        >
          <div>{{ item.bucket_name }}</div>
          <div class="text-primary-900">{{ item.bucket_stocks.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  top: 3.6rem;
}
</style>
<script>
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";
import ClickOutside from "vue-click-outside";

const { mapFields } = createHelpers({
  getterType: "dashboard/getField",
  mutationType: "dashboard/updateField"
});

export default {
  data: function() {
    return {
      show: false
    };
  },
  mounted: function() {
    this.popupItem = this.$el;
  },
  computed: {
    ...mapFields({
      list: "list"
    })
  },
  methods: {
    close() {
      this.show = false;
    },
    ...mapActions("dashboard", ["setFocusBucket"]),
    bucketSelect(bucket) {
      this.show = false;
      this.setFocusBucket(bucket);
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
