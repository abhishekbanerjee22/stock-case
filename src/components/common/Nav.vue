<template>
  <nav
    class="flex font-body bg-blue-900 relative items-center justify-between flex-wrap p-4 lg:p-10 shadow font-body font-semibold"
  >
    <div class="block flex w-full justify-between items-center lg:hidden">
      <a
        class="block tracking-widest cursor-pointer lg:inline-block text-4xl rounded leading-4 lg:mt-0 text-white font-thin mr-4 "
        @click="() => goTo('/')"
      >
        <span>stock</span>
        <span class="text-primary-900">case</span>
      </a>
      <button
        class="flex items-center px-3 py-2 border rounded text-primary-900 border-primary-900 hover:text-white hover:border-gray-700 outline-none"
        @click="show = !show"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="
        `${
          show ? 'block' : 'hidden'
        } bg-blue-900 absolute left-0 z-20 top-4rem p-4 shadow sm:absolute md:absolute lg:shadow-none lg:relative lg:left-0 lg:p-0 lg:top-0 w-full flex-grow lg:flex lg:items-center lg:w-auto`
      "
    >
      <div class="text-sm hidden lg:block lg:flex-grow">
        <a
          class="block mt-4 cursor-pointer tracking-widest lg:inline-block px-3 py-1.5 text-5xl rounded leading-4 lg:mt-0 text-xs text-white font-thin mr-4 "
          @click="() => goTo('/')"
        >
          <span>stock</span>
          <span class="text-primary-900">case</span>
        </a>
      </div>
      <div v-if="!firstName">
        <StButton text="login" @onclick="() => goTo('login')" />
        <StButton text="signup" focused @onclick="() => goTo('signup')" />
      </div>
      <div v-else class="flex justify-center items-center text-white">
        <div class="w-10 h-10 bg-primary-900 rounded-full mr-2" />
        <div>
          <p class="text-sm">{{ `${firstName} ${lastName}` }}</p>
          <p class="text-xs text-gray-600">{{ email }}</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.outline-none:focus {
  outline: none;
}
</style>

<script>
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";
import StButton from "@/components/common/Button";

const { mapFields } = createHelpers({
  getterType: "user/getField",
  mutationType: "user/updateField"
});
export default {
  components: {
    StButton
  },
  data: function() {
    return {
      show: false
    };
  },
  methods: {
    goTo: function(to) {
      this.$router.push(to);
    }
  },
  computed: {
    ...mapFields({
      firstName: "details.firstName",
      lastName: "details.lastName",
      email: "details.email",
      loading: "activity.loading"
    })
  }
};
</script>
