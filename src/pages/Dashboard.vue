<template>
  <div class="bg-blue-900 px-4 lg:px-10">
    <ActionCard />
    <News />
  </div>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";

import ActionCard from "@/components/common/ActionCard";
import News from "@/components/common/News";

const { mapFields } = createHelpers({
  getterType: "user/getField",
  mutationType: "user/updateField"
});

export default {
  components: {
    ActionCard,
    News
  },
  computed: {
    ...mapFields({
      email: "details.email",
      loading: "activity.loading"
    })
  },
  watch: {
    loading: function() {
      if (this.loading === false) {
        if (!this.email) {
          this.$router.push("/login");
        }
      }
    }
  }
};
</script>
