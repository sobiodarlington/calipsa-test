<template>
<b-form
  @submit.prevent="submitQuestion"
  autocomplete="false"
  class="mt-4 text-left">
  <b-row class="ml-auto mr-auto w-100">
    <b-col md="10" class="pr-0">
      <ValidationProvider name="Question" rules="required">
        <b-form-textarea
          v-model="question.message"
          placeholder="Enter question..."
          rows="2"
          max-rows="4"
          @keydown.space.prevent
        ></b-form-textarea>
      </ValidationProvider>
    </b-col>
    <b-col md="2" class="d-flex pl-0">
      <b-button type="submit" variant="outline-primary" class="w-100" v-loading="isLoading">
        SEND
      </b-button>
    </b-col>
  </b-row>
</b-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "ResponseCard",
  data() {
    return {
      question: {
        sessionId: this.$route.params.sessionId,
        message: null,
      },
      isLoading: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions('gamePlay', ['askQuestion']),
    submitQuestion() {
      this.isLoading = true;

      this.askQuestion({
        question: {
          sessionId: this.question.sessionId,
          message: this.question.message.replaceAll('?', ''),
        },
      }).then(() => {
        this.question.message = '';
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;

        this.$notify({
          group: 'app',
          type: 'error',
          title: 'Message',
          text: error.message,
        });
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
