<template>
  <section class="bg-blue-900 text-white p-4 md:p-16">
    <h3 class="text-center text-3xl mb-8 font-bold">Login to stockcase</h3>
    <form
      class="flex bg-white p-4 text-black flex-col text-center  border border-solid border-gray-500 py-16 m-auto shadow form-width rounded"
      @submit.prevent="login"
    >
      <label class="flex flex-col items-start mb-4">
        <span class="">Email address</span>
        <input
          type="text"
          placeholder="Enter your email"
          class="outline-none w-full"
          v-model="email"
          required
        />
      </label>
      <label class="flex flex-col items-start mb-4">
        <span>Password</span>
        <input
          type="password"
          placeholder="Enter your password"
          class="outline-none w-full"
          v-model="password"
          required
        />
      </label>
      <button
        class="text-white bg-primary-900 font-semibold text-xl px-6 py-2 rounded-sm font-body"
      >
        submit
      </button>
      {{ { details } }}
    </form>
    <h5 class="text-center p-16 pb-24">
      Not a member?
      <router-link to="/signup" class="text-primary-900">Sign up</router-link>
    </h5>
  </section>
</template>

<style scoped>
.form-width {
  max-width: 32rem;
  width: 100%;
}
</style>

<script>
import { createHelpers } from "vuex-map-fields";
import { mapActions } from "vuex";

const { mapFields } = createHelpers({
  getterType: "user/getField",
  mutationType: "user/updateField"
});
export default {
  methods: {
    ...mapActions("user", ["login"])
  },
  computed: {
    ...mapFields({
      valid: "details.email",
      email: "form.email",
      details: "details",
      password: "form.password",
      firstName: "form.firstName",
      lastName: "form.lastName",
      loading: "activity.loading",
      error: "activity.error"
    })
  },
  watch: {
    valid: function() {
      if (this.valid) {
        this.$router.push("/dashboard");
      }
    }
  }
};
</script>
