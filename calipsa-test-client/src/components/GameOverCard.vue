<template>
<div class="mt-4">
  <b-card no-body class="overflow-hidden ml-auto mr-auto" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="12">
        <b-card-body>
          <b-card-text v-if="youWon" class="text-success">
            <strong>Game Over! You Won!!!</strong>
          </b-card-text>
          <b-card-text v-if="youLose" class="text-danger">
            <strong>Game Over! You lost!!!</strong>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "GameOverCard",
  props: {
    gameOverByAns: Boolean,
    gameOverByQstCount: Boolean,
    lastQuestion: Object,
  },
  filters: {
    titleize(value){
      return value.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
    }
  },
  computed: {
    youWon() {
      const hostWon = this.gameOverByQstCount && this.isHost;
      const player2Won = this.gameOverByAns && !this.isHost;

      return hostWon || player2Won;
    },
    youLose() {
      const hostLose = this.gameOverByAns && this.isHost;
      const player2Lose = this.gameOverByQstCount && !this.isHost;

      return hostLose || player2Lose;
    },
    ...mapState('user', {
      self: state => state.userDetails,
    }),
    ...mapState('gamePlay', {
      isHost(state) {
        const session = state.currentSession.session || {};

        return session.hostPlayerId === this.self.id;
      },
    }),
  },
  methods: {
    ...mapActions('gamePlay', {
      respondToQuestion: 'respond',
    }),
    respondYes() {
      this.respond(true);
    },
    respondNo() {
      this.respond(false);
    },
    respond(answer) {
      this.respondToQuestion({
        respond: {
          answer,
          questionId: this.question.id,
          sessionId: this.question.gameSessionId,
        },
      });
    },
  },
};
</script>

<style scoped>
.card-image {
  height: 100%;
  object-fit: cover;
}

.bi-check2, .bi-exclamation-circle {
  color: #03A9F4;
  transition: font-size 0.2s;
}

.bi-check2:hover, .bi-exclamation-circle:hover {
  font-size: calc(100% - 50px);
}
</style>
