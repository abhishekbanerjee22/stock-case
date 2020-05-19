import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const state = {
  details: {
    firstName: "",
    lastName: "",
    email: ""
  },
  signUpSuccess: false,
  loginSuccess: false,
  form: {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  },
  activity: {
    loading: false,
    error: ""
  }
};

const namespaced = true;

export const user = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
