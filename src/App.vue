<template>
  <div class="font-body">
    <StNav />
    <router-view></router-view>
  </div>
</template>

<script>
import StNav from "@/components/common/Nav";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    StNav
  },
  methods: {
    ...mapActions("user", ["getUserInfo"])
  },
  mounted() {
    this.getUserInfo();
  },

  data: () => ({
    //
  })
};
</script>
