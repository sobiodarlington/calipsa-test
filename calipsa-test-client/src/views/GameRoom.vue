<template>
  <fragment>
    <BackButton />
    <h3>Game Room</h3>

    <section id="game-room">
      <b-row class="p-3 mb-auto">
        <b-col>
          <b-avatar class="mr-3" variant="primary"></b-avatar>
          <span class="mr-auto">{{ players.hostPlayer.username }}</span>
           <b-badge class="badge-warning">Host</b-badge>
        </b-col>
        <b-col>
          <b-avatar class="mr-3" variant="info"></b-avatar>
          <span class="mr-auto">{{ players.secondPlayer.username }}</span>
        </b-col>
      </b-row>

      <QuestionCard
        v-for="(question, index) in questions"
        v-bind:key="question.id"
        v-bind:qstCountText="qstCountText(index)"
        v-bind:question="question"
      />
      <MessageCard
        v-if="!gameOver && !isHost && showDefaultQst"
        v-bind:message="defaultQuestion"
      />
      <MessageCard
        v-if="!gameOver && isHost && noQst"
        v-bind:message="'Think of a word... Now wait for a question.'"
      />
      <MessageCard
        v-if="!gameOver && isHost && showDefaultMsg"
        v-bind:message="'Wait for another question...'"
      />
      <GameOverCard
        v-if="gameOver"
        v-bind:lastQuestion="lastQuestion"
        v-bind:gameOverByAns="gameOverByAns"
        v-bind:gameOverByQstCount="gameOverByQstCount"
      />
      <ResponseCard v-if="showResponseForm"/>
    </section>
  </fragment>
</template>

<script>
import * as mutationTypes from '../store/mutation-types';
import BackButton from '@/components/BackButton.vue';
import QuestionCard from '@/components/QuestionCard.vue';
import ResponseCard from '@/components/ResponseCard.vue';
import MessageCard from '@/components/MessageCard.vue';
import GameOverCard from '@/components/GameOverCard.vue';
import { mapState, mapActions, mapMutations } from 'vuex';


export default {
  name: 'GameRoom',
  components: {
    QuestionCard,
    GameOverCard,
    BackButton,
    ResponseCard,
    MessageCard,
  },
  data() {
    return {
      count: 0,
      sessionId: this.$route.params.sessionId,
      defaultQuestion: 'What\'s on my mind?',
      isLoading: false,
    };
  },
  computed: {
    showResponseForm() {
      return !this.isHost && !this.gameOver && this.questionCount !== 20;
    },
    showDefaultQst() {
      return !this.isHost && (!this.lastQuestion.question || this.lastQuestion.answer === false);
    },
    showDefaultMsg() {
      return this.isHost && (this.lastQuestion.question && this.lastQuestion.answer === false);
    },
    gameOver() {
      return this.lastQuestion.answer === true
        || (this.questionCount === 20 && this.lastQuestion.answer === false);
    },
    gameOverByAns() {
      return this.lastQuestion.answer === true;
    },
    gameOverByQstCount() {
      return (this.questionCount === 20 && this.lastQuestion.answer === false);
    },
    noQst() {
      return !this.questions.length;
    },
    ...mapState('user', {
      self: state => state.userDetails,
      users: state => state.users.filter(u => u.id !== state.userDetails.id),
    }),
    ...mapState('gamePlay', {
      currentSession: state => state.currentSession,
      session: state => state.currentSession.session || {},
      questions: state => state.currentSession.questions || [],
      questionCount: state => state.currentSession.questionCount || 0,
      lastQuestion() {
        return this.questions.slice(-1).pop() || {};
      },
      isHost() {
        const session = this.session || {};

        return session.hostPlayerId === this.self.id;
      },
      players() {
        const defaultData = { hostPlayer: 'Host', secondPlayer: 'Player 2'};

        return this.session.players || defaultData;
      }
    }),
  },
  mounted() {
    this.loadGameData(this.sessionId);

    const types = {
      QUESTION: 'QUESTION',
      RESPONSE: 'RESPONSE',
      GAME_SESSION: 'GAME_SESSION',
    };

    this.sockets.subscribe(`${this.sessionId}:message`, (payload) => {
      if (payload.type === types.QUESTION && this.isHost) {
        // Store question data for hostPlayer
        this.setQuestion(payload.data);
      } else if (payload.type === types.RESPONSE && !this.isHost) {
        // Store response for data for secondPlayer
        this.setResponse(payload.data);
      } else if (payload.type === types.GAME_SESSION && !this.isHost) {
        // Store response for data for secondPlayer
        this.requestDialog();
      }
    });
  },
  methods: {
    qstCountText(index) {
      const count = index + 1;

      return `${count}/20`;
    },
    ...mapMutations('gamePlay', {
      setQuestion: mutationTypes.SET_QUESTION,
      setResponse: mutationTypes.SET_RESPONSE,
    }),
    ...mapActions('gamePlay', ['getGameData', 'acceptRejectReq']),
    loadGameData(sessionId) {
      // if (this.currentSession.session) return;

      this.getGameData(sessionId)
        .catch((error) => {
          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Cannot start game',
            text: error.message,
          });

          this.$router.push('/');
        });
    },
  }
}
</script>

<style lang="scss" scoped>
#game-room {
  width: 65%;
  border: 1px solid #e2dfdf;
  border-radius: 10px;
  min-height: 300px;
  background: #f7f7f7;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding-bottom: 15px;
}

@media only screen and (max-width: 600px) {
  #game-room {
    width: 100%;
  }
}
</style>
