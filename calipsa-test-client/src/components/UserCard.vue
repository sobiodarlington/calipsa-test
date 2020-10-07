<template>
<div class="mt-4">
  <b-card no-body class="overflow-hidden mb-4" style="max-width: 540px;">
    <b-row no-gutters class="flex-nowrap">
      <b-col md="2">
        <b-card-img :src="randomImg" alt="Image" class="rounded-0 card-image w-400"></b-card-img>
      </b-col>
      <b-col md="8">
        <b-card-body v-bind:title="name">
          <b-card-text>
            Want to play?
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col md="2" class="d-flex">
        <button class="btn" @click="startGame" v-loading="isLoading">
          <b-icon
            font-scale="5"
            icon="file-play"
            aria-hidden="true"></b-icon>
        </button>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  name: "card",
  props: {
    userId: String,
    name: String,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    randomImg() {
      return `https://picsum.photos/300/300?${Date.now()}`;
    },
  },
  methods: {
    ...mapActions('gamePlay', {
      startGameSession: 'startGame',
    }),
    startGame() {
      this.isLoading = true
      this.startGameSession({
        start: {
          secondPlayerId: this.userId,
        },
      }).then((response) => {
        this.$router.push({
          name: 'game-room',
          params: {
            sessionId: response.data.session.id,
          },
        })
      }).catch((error) => {
        this.isLoading = false;

        this.$notify({
          group: 'auth',
          type: 'error',
          title: 'Cannot start game',
          text: error.message,
        });
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
};
</script>

<style scoped>
.card-image {
  height: 100%;
  object-fit: cover;
}

.bi-file-play {
  color: #03A9F4;
  transition: color 0.2s;
}

.bi-file-play:hover {
  color: gray;
}
</style>
