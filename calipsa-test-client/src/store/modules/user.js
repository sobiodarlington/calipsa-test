import * as type from '../mutation-types';
import LocalStore from '@/common/LocalStore';
import { HTTP } from '@/common/Http';
import ResponseHandler from '@/common/ResponseHandler';
import Constants from '@/common/Constants';


export default {
  state: {
    id: LocalStore.retrieve('id'),
    userDetails: {},
    username: LocalStore.retrieve('username'),
    email: LocalStore.retrieve('email'),
    jwt: LocalStore.retrieve('token'),
    users: [],
  },
  mutations: {
    [type.SET_USERS](state, data) {
      state.users = data.users;
    },
    [type.SET_USER_DATA](state, data) {
      state.userDetails = data.user;
    },
    [type.SET_USER_TOKEN_ONLY](state, param) {
      LocalStore.store('token', param.data.token);
      state.jwt = param.data.token;
    },
    [type.SET_USER_TOKEN](state, data) {
      LocalStore.store('id', data.user.id);
      LocalStore.store('username', data.user.username);
      LocalStore.store('email', data.user.email);
      LocalStore.store('token', data.token);

      state.jwt = data.token;
      state.id = data.user.id;
      state.username = data.user.username;
      state.email = data.user.email;
    },
    [type.REMOVE_USER_TOKEN](state) {
      LocalStore.clear();
      sessionStorage.clear();

      state.jwt = null;
      state.id = null;
      state.username = null;
      state.email = null;
      state.users = [];
      state.userDetails = {};
    },
  },
  actions: {
    getUsers({ commit }, payload) {
      return HTTP.get('users', payload)
        .then((response) => {
          if (response && response.responseCode === 1) {
            commit(type.SET_USERS, response.data);
          }

          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    refreshToken({ commit }) {
      const headers = {};
      this._vm.$Progress.start();
      return HTTP.post('auth/refresh', false, { headers })
        .then((response) => {
          commit({
            type: type.SET_USER_TOKEN_ONLY,
            data: response.data,
          });

          this._vm.$Progress.finish();
          return ResponseHandler.success(response);
        })
        .catch((err) => ResponseHandler.error(err));
    },
    registerUser({ commit }, payload) {
      return HTTP.post('user/register', payload)
        .then((response) => {
          if (response && response.responseCode === 1) {
            commit(type.SET_USER_DATA, response.data);
            commit(type.SET_USER_TOKEN, {
              user: response.data.user,
              token: response.data.token,
            });
          }

          return response;
        });
    },
    loginUser({ commit }, payload) {
      return HTTP.post('user/auth', payload)
        .then((response) => {
          if (response && response.responseCode === 1) {
            commit(type.SET_USER_DATA, response.data);
            commit(type.SET_USER_TOKEN, {
              user: response.data.user,
              token: response.data.token,
            });
          }

          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    logoutUser({ commit }) {
      commit(type.REMOVE_USER_TOKEN);
    },
    sessionError({ commit }) {
      commit(type.REMOVE_USER_TOKEN);
      this._vm.$notify({
        group: 'app',
        type: 'warn',
        title: 'Session Expired',
        text: Constants.SESSION_EXPIRE,
      });
    },
  },
};
