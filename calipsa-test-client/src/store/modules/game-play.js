import Vue from 'vue';
import * as type from '../mutation-types';
import { HTTP } from '@/common/Http';


export default {
  state: {
    sessions: {},
    currentSession: {
      session: {},
      questions: [],
      questionCount: 0,
    },
  },
  mutations: {
    [type.CLEAR_GAME_DATA](state) {
      state.sessions = {};
      state.currentSession = {
        session: {},
        questions: [],
        questionCount: 0,
      };
    },
    [type.SET_SESSION](state, data) {
      state.sessions[data.id] = data;

      state.currentSession.session = data.session;

      if (data.questions) {
        state.currentSession.questions = data.questions;
      }

      if (data.questionCount) {
        state.currentSession.questionCount = data.questionCount;
      }
    },
    [type.SET_QUESTION](state, data) {
      Vue.set(state.currentSession, 'questions', [
        ...state.currentSession.questions,
        data,
      ]);
      state.currentSession.questionCount =
        state.currentSession.questions.length;
    },
    [type.SET_QUESTIONS](state, data) {
      state.currentSession.questions = data;
    },
    [type.SET_GAME_DATA](state, data) {
      const questions = data.questions;

      delete data.questions;

      state.sessions[data.id] = data;
      state.currentSession.session = data;
      state.currentSession.questions = questions;
      state.currentSession.questionCount = questions.length;
    },
    [type.SET_RESPONSE](state, data) {
      const questions = state.currentSession.questions;
      const foundIndex = questions.findIndex(v => v.id == data.id);

      if (foundIndex >= 0) {
        Vue.set(state.currentSession.questions, foundIndex, data);
      }
    },
  },
  actions: {
    startGame({ commit }, payload) {
      return HTTP.post('game-play/start', payload).then(response => {
        commit(type.SET_SESSION, response.data);

        return response;
      });
    },

    askQuestion({ commit }, payload) {
      return HTTP.post('game-play/ask-question', payload).then(response => {
        commit(type.SET_QUESTION, response.data);

        return response;
      });
    },

    respond({ commit }, payload) {
      return HTTP.put('game-play/respond', payload).then(response => {
        commit(type.SET_RESPONSE, response.data);

        return response;
      });
    },

    acceptRejectReq({ commit }, payload) {
      return HTTP.put('game-play/request', payload).then(response => {
        commit(type.SET_SESSION, response.data);

        return response;
      });
    },

    getQuestions({ commit }, sessionId) {
      return HTTP.get(`game-play/${sessionId}/questions`).then(response => {
        commit(type.SET_QUESTIONS, response.data);

        return response;
      });
    },

    getGameData({ commit }, sessionId) {
      return HTTP.get(`game-play/${sessionId}/game-data`).then(response => {
        commit(type.SET_GAME_DATA, response.data);

        return response;
      });
    },
  },
};
