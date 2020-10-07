<template>
  <fragment>
    <h3>Game Players</h3>
    <div id="users">
      <UserCard
        v-for="user in users"
        v-bind:key="user.id"
        v-bind:userId="user.id"
        v-bind:name="user.username"
      />
    </div>
  </fragment>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Index',
  components: { UserCard },
  computed: {
    ...mapState('user', {
      self: state => state.userDetails,
      users: state => state.users.filter(u => u.id !== state.userDetails.id),
    }),
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions('user', ['getUsers']),
  }
}
</script>

<style>
#users {
  transition: width 0.5s, height 0.2s;
}
</style>
