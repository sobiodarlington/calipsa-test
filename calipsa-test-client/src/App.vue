<template>
  <div id="app">
    <NavBar />
    <section id="main">
      <router-view/>
    </section>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
    <notifications group="auth"/>
    <notifications group="app"/>
    <LoginModal :register="registerModal" />
    <RegisterModal :login="loginModal" />
    <v-dialog/>
  </div>
</template>

<script>
import NavBar from '@/components/shared/NavBar.vue';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import ResponseHandler from '@/common/ResponseHandler';
import { HTTP } from '@/common/Http';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    LoginModal,
    NavBar,
    RegisterModal,
  },
  computed: {
    ...mapState('user', {
      isLoggedIn: state => !!state.jwt,
    }),
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$modal.show('login-modal');
    }
  },
  created() {
    window.addEventListener('scroll', () => {
      this.updateScrollBottomReached(this.bottomVisible());
    });
  },
  methods: {
    loginModal() {
      this.$modal.hide('register-modal');
      this.$modal.show('login-modal');
    },
    registerModal() {
      this.$modal.hide('login-modal');
      this.$modal.show('register-modal');
    },
    ...mapMutations(['updateScrollBottomReached']),
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;

      return bottomOfPage || pageHeight < visible;
    }
  },
  beforeCreate() {
    // Add a request interceptor
    HTTP.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        this.$Progress.start();
        this.updateScrollBottomReached(false);

        return config;
      },
      (error) => {
        // Do something with request error
        this.$Progress.finish();
        this.updateScrollBottomReached(false);

        throw ResponseHandler.error(error);
      }
    );

    // Add a response interceptor
    HTTP.interceptors.response.use(
      (response) => {
        // Do something with response data
        this.$Progress.finish();

        return ResponseHandler.success(response);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // let page = document.querySelector('body');
          // if (page) page.style.webkitFilter = 'grayscale(1)';

          this.$modal.show('login-modal');
        }

        // Do something with response error
        this.$Progress.finish();

        throw ResponseHandler.error(error.response || error);
      }
    );
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
