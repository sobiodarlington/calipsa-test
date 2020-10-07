import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import modules from './modules';
import mutations from './mutations';
import getters from './getters';
import Constants from '@/common/Constants';


Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: Constants.PERSISTENT_STORE_NS,
  storage: sessionStorage,
});

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  modules,
  mutations,
  getters,
  plugins: [vuexPersist.plugin],
});
