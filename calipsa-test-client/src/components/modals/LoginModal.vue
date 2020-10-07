<template>
  <modal
    name="login-modal"
    :clickToClose="false"
    :scrollable="false"
    :width="656"
    :height="400"
  >
    <div class="row h-100">
      <div class="col-sm-6 col-xs-12 m-4">
        <div class="partition-title">LOGIN</div>
        <b-form @submit.prevent="login" class="mt-4 text-left">
          <div class="form-group">
            <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
              <label for="email">Email</label>
              <b-form-input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                class="form-control form-control-sm"
                v-model="auth.email"
              />
              <small v-if="errors[0]" class="form-text text-danger">
                {{ errors[0] }}
              </small>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
              <label for="password">Password</label>
              <b-form-input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                class="form-control form-control-sm"
                v-model="auth.password"
              />
              <small v-if="errors[0]" class="form-text text-danger">
                {{ errors[0] }}
              </small>
            </ValidationProvider>
          </div>

          <div class="button-set">
            <button class="btn btn-outline-primary mr-3" v-loading="isLoading">
              Login
            </button>
            <a href="#" @click.prevent="register">Register</a>
          </div>
        </b-form>
      </div>
      <div
        id="bp-right"
        class="col"
        style="background: url(./img/panorama.jpg) no-repeat 0 0;"
      >
        <div class="box-messages"></div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginModal',
  props: {
    register: { type: Function },
  },
  data() {
    return {
      auth: {
        email: null,
        password: null,
      },
      isLoading: false,
    };
  },
  methods: {
    show() {
      this.$modal.show('login-modal');
    },
    hide() {
      this.$modal.hide('login-modal');
    },
    ...mapActions('user', ['loginUser']),
    login() {
      this.isLoading = true;

      this.loginUser({ auth: this.auth })
        .then(() => {
          this.isLoading = false;

          this.hide();
          this.$notify({
            group: 'auth',
            type: 'success',
            title: 'Login Success',
            text: 'Welcome, your login was successful',
          });

          window.location.reload();
        }).catch((error) => {
          this.isLoading = false;

          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Login Error',
            text: error.message,
          });
        });
    },
    beforeOpen() {
      sessionStorage.clear();
      localStorage.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
.box,
.box .box-part {
  box-sizing: border-box;
}

.box {
  background: #fff;
  overflow: hidden;
  width: 656px;
  height: 400px;
  border-radius: 2px;
  box-shadow: 0 0 40px #000;
  color: #8b8c8d;
  font-size: 0;
}

#bp-right {
  background: url(http://vue-js-modal.yev.io/static/panorama.jpg) no-repeat 0 0;
  border-left: 1px solid #eee;
}

.box .box-part {
  display: inline-block;
  position: relative;
  vertical-align: top;
  height: 100%;
  width: 50%;
}

.box .github-btn {
  border-color: #dba226;
  color: #dba226;
}

.box .large-btn {
  width: 100%;
  background: #fff;
}

.box button {
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-weight: 400;
  min-width: 140px;
  margin-top: 8px;
  color: #8b8c8d;
  cursor: pointer;
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: all 0.1s;
  font-size: 10px;
  outline: none;
}
</style>
