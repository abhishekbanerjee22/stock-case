import {
  SET_USER,
  SET_ERROR,
  SET_LOADER,
  SET_LOGIN_STATUS,
  SET_SIGNUP_STATUS,
  CLEAR_FORM_DATA
} from "./mutation-types";
import axios from "axios";
import Cookies from "js-cookie";
import { loginRequest, signUpRequest, getUserInfo } from "@/utils/apis";

export const actions = {
  async getUserInfo({ commit }) {
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.post["api-access-token"] = token;
      commit(SET_LOADER, true);
      const { status, data } = await getUserInfo();
      if (status === "success") {
        commit(SET_USER, data);
      } else {
        Cookies.remove("token");
      }
      commit(SET_LOADER, false);
    }
  },
  async login({ commit, state, dispatch }) {
    const { email, password } = state.form;
    commit(SET_LOADER, true);
    const { status, data } = await loginRequest({ email, password });
    if (status === "success") {
      axios.defaults.headers.post["api-access-token"] = data.jwt;
      Cookies.set("token", data.jwt);
      await dispatch("getUserInfo");
    } else {
      commit(SET_ERROR, data.message);
    }
    commit(SET_LOADER, false);
  },
  async signup({ commit, state }) {
    const { firstName, lastName, email, password } = state.form;
    commit(SET_LOADER, true);
    const { status, data } = await signUpRequest({
      first_name: firstName,
      last_name: lastName,
      email,
      password
    });
    if (status === "success") {
      //   commit(SET_USER, data);
      commit(CLEAR_FORM_DATA);
      commit(SET_SIGNUP_STATUS, true);
    } else {
      commit(SET_ERROR, data.message);
    }
    commit(SET_LOADER, false);
  },
  setSignUpStatus({ commit }, payload) {
    commit(SET_SIGNUP_STATUS, payload);
    commit(SET_ERROR, "");
  },
  setLoginStatus({ commit }, payload) {
    commit(SET_LOGIN_STATUS, payload);
  }
};
