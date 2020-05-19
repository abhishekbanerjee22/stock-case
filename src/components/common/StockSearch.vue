<template>
  <div class="relative width-across">
    <input
      type="text"
      class="bg-transparent border text-xs border-solid border-gray-800 w-full width-across p-4 px-6 outline-none rounded-full"
      placeholder="Select any stock"
      v-model="search"
    />
    <div
      class="absolute right-0 left-0 bg-blue-900 mx-4 p-4 popup"
      v-if="open"
      v-click-outside="close"
    >
      <h5 class="text-sm text-gray-300">Stocks</h5>
      <div
        class="flex justify-between w-full items-center py-2"
        v-for="item in searchResult"
        :key="item.id"
      >
        <button
          class="bg-blue-800 hover:bg-primary-900 button"
          @click="() => addStock(item)"
        >
          +
        </button>
        <p class="text-base">{{ item.symbol }}</p>
        <p class="text-base ellipsis">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.popup {
  top: 3.4rem;
  z-index: 2;
}
.width-across {
  width: 20rem;
}
@media (max-width: 417px) {
  .width-across {
    width: 100%;
  }
}
.button {
  @apply bg-blue-800;
  width: 2.6rem;
  padding-bottom: 1rem;
  height: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ellipsis {
  width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import ClickOutside from "vue-click-outside";
import { debounce } from "@/utils/debounce";
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";

const { mapFields } = createHelpers({
  getterType: "bucket/getField",
  mutationType: "bucket/updateField"
});
export default {
  data: function() {
    return {
      open: false
    };
  },
  mounted: function() {
    this.popupItem = this.$el;
  },
  methods: {
    ...mapActions("bucket", ["getStocksData", "addStock"]),
    close: function() {
      this.open = false;
    }
  },
  computed: {
    ...mapFields({
      search: "search",
      searchResult: "searchResult"
    })
  },
  watch: {
    search: debounce(function() {
      this.getStocksData();
      this.open = true;
    }, 500)
  },
  directives: {
    ClickOutside
  }
};
</script>
