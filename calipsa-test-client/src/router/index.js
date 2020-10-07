import Vue from "vue";
import Router from "vue-router";
import Index from "../views/Index.vue";
import GameRoom from '../views/GameRoom.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/game-room/:sessionId',
      name: 'game-room',
      component: GameRoom,
    },
  ],
});
