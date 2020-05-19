import { updateField } from "vuex-map-fields";

import {
  SET_USER,
  SET_LOADER,
  SET_ERROR,
  SET_LOGIN_STATUS,
  SET_SIGNUP_STATUS,
  CLEAR_FORM_DATA
} from "./mutation-types";

export const mutations = {
  [SET_USER](state, payload) {
    state.details.email = payload.email;
    state.details.firstName = payload.first_name;
    state.details.lastName = payload.last_name;
  },
  [SET_LOADER](state, payload) {
    state.activity.loading = payload;
  },
  [SET_ERROR](state, payload) {
    state.activity.error = payload;
  },
  [SET_LOGIN_STATUS](state, payload) {
    state.loginSuccess = payload;
  },
  [SET_SIGNUP_STATUS](state, payload) {
    state.signUpSuccess = payload;
  },
  [CLEAR_FORM_DATA](state, payload) {
    state.form.email = "";
    state.form.firstName = "";
    state.form.lastName = "";
    state.form.password = "";
  },
  updateField
};
