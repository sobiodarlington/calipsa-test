<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Calipsa</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ self.username }}</em>
            </template>
            <b-dropdown-item href="#" @click.prevent="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import * as mutationTypes from '../../store/mutation-types';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: "NavBar",
  computed: {
    ...mapState('user', {
      self: state => state.userDetails,
    }),
  },
  methods: {
    ...mapActions('user', ['logoutUser']),
    ...mapMutations('gamePlay', {
      clearGameData: mutationTypes.CLEAR_GAME_DATA,
    }),
    logout() {
      this.logoutUser();
      this.clearGameData();

      this.$parent.loginModal();
    }
  }
};
</script>

<style scoped>
</style>
