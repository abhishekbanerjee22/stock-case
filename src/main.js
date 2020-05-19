import Vue from "vue";
import store from "./store";

import App from "./App.vue";

import Router from "vue-router";
import Home from "@/pages/Home.vue";
import SignUp from "@/pages/SignUp.vue";
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";

import "@/assets/css/tailwind.css";
import "@/assets/css/main.css";

Vue.use(Router);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/signup", name: "Sign Up", component: SignUp },
  { path: "/login", name: "Login", component: Login },
  { path: "/dashboard", name: "Dashboard", component: Dashboard }

  // { path: "/dashboard", component: Home, name: "dashboard", props: true }
];

const router = new Router({
  mode: "history",
  routes
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
