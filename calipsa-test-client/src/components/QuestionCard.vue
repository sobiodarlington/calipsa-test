<template>
<div class="mt-4">
  <b-card no-body class="overflow-hidden ml-auto mr-auto" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col :md="question.default ? 12 : qstOrRespUnit">
        <b-card-body>
          <b-card-text v-bind:class="{ 'text-info': question.default }">
            {{ question.question | titleize }}?
            <small class="text-secondary">({{ qstCountText }})</small>
          </b-card-text>
        </b-card-body>
      </b-col>
      <fragment v-if="isHost && question.answer === null">
        <b-col md="2" class="bg-light d-flex align-items-center justify-content-center">
          <button class="btn" @click="respondYes">
            <b-icon icon="check2" font-scale="3" aria-hidden="true"></b-icon>
          </button>
        </b-col>
        <b-col md="2" class="bg-light d-flex align-items-center justify-content-center border-left">
          <button class="btn" @click="respondNo">
            <b-icon
              class="text-danger"
              font-scale="3"
              icon="exclamation-circle"
              aria-hidden="true"></b-icon>
          </button>
        </b-col>
      </fragment>
      <fragment v-else-if="!isHost || question.answer !== null">
        <b-col md="2" class="bg-light d-flex align-items-center justify-content-center">
          <b-icon
            v-if="question.answer === null"
            icon="question"
            font-scale="3"
            aria-hidden="true"></b-icon>
          <b-icon
            v-if="question.answer === false"
            class="text-danger"
            font-scale="3"
            icon="exclamation-circle"
            aria-hidden="true"></b-icon>
          <b-icon
            v-if="question.answer === true"
            class="text-success"
            icon="check2"
            font-scale="3"
            aria-hidden="true"></b-icon>
        </b-col>
      </fragment>
    </b-row>
  </b-card>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "QuestionCard",
  props: {
    question: Object,
    qstCountText: String,
  },
  filters: {
    titleize(value){
      return value.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
    }
  },
  computed: {
    qstOrRespUnit() {
      return this.isHost && this.question.answer === null ? 8 : 10;
    },
    ...mapState('user', {
      self: state => state.userDetails,
      users: state => state.users.filter(u => u.id !== state.userDetails.id),
    }),
    ...mapState('gamePlay', {
      session: state => state.currentSession.session,
      isHost() {
        const session = this.session || {};

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
