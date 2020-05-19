<template>
  <section class="bg-blue-900 text-white p-4 md:p-16">
    <div v-if="!signUpSuccess">
      <h3 class="text-center text-3xl mb-8 font-bold">Sign up on stockcase</h3>
      <form
        class="flex bg-white p-4 text-black flex-col text-center  border border-solid border-gray-500 py-16 m-auto shadow form-width rounded"
        @submit.prevent="signup"
      >
        <div class="flex flex-col md:flex-row justify-between mb-4">
          <label class="flex mb-4 md:mb-0 flex-col items-start">
            <span class="">First name</span>
            <input
              type="text"
              placeholder="Enter you first name"
              class="flex-1 outline-none"
              required
              v-model="firstName"
            />
          </label>
          <label class="flex mb-4 md:mb-0 flex-col items-start">
            <span class="">Last name</span>
            <input
              type="text"
              placeholder="Enter you last name"
              class="outline-none"
              required
              v-model="lastName"
            />
          </label>
        </div>
        <label class="flex flex-col items-start mb-4">
          <span class="">Email address</span>
          <input
            type="text"
            placeholder="Enter your email"
            class="outline-none w-full"
            required
            v-model="email"
          />
        </label>
        <label class="flex flex-col items-start mb-4">
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            class="outline-none w-full"
            required
            v-model="password"
          />
        </label>

        <div class="text-red-550">
          {{ error }}
        </div>

        <button
          class="text-white bg-primary-900 font-semibold text-xl px-6 py-2 rounded-sm font-body"
        >
          submit
        </button>
      </form>
      <h5 class="text-center p-16 pb-8">
        Already a member?
        <router-link to="/login" class="text-primary-900">Login</router-link>
      </h5>
    </div>
    <div
      v-else
      class="flex bg-white p-4 text-black flex-col items-center text-center  border border-solid border-gray-500 py-16 m-auto shadow form-width rounded"
    >
      <img src="@/assets/images/success.svg" alt="success" class="w-32" />
      <h5 class="text-center p-16 pb-8">
        You have been successfully registered.
        <router-link to="/login" class="block text-underline text-primary-900">
          Login Now
        </router-link>
      </h5>
    </div>
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
    ...mapActions("user", ["signup", "setSignUpStatus"])
  },
  mounted() {
    this.setSignUpStatus(false);
  },
  computed: {
    ...mapFields({
      email: "form.email",
      password: "form.password",
      firstName: "form.firstName",
      lastName: "form.lastName",
      loading: "activity.loading",
      error: "activity.error",
      signUpSuccess: "signUpSuccess"
    })
  }
};
</script>
