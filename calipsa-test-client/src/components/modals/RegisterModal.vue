<template>
  <modal
    name="register-modal"
    :clickToClose="false"
    :scrollable="false"
    :width="656"
    :height="'80%'"
  >
    <div class="row h-100">
      <div class="col-sm-6 col-xs-12 m-4">
        <div>REGISTER</div>
        <b-form @submit.prevent="register" class="mt-4 text-left">
          <ValidationProvider
            name="Username"
            rules="required|alpha_dash|min:8|max:20"
            v-slot="{ errors }">
            <b-form-group
              id="username-group"
              label="Username"
              label-for="username"
              description="">
              <b-form-input
                id="username"
                v-model="user.username"
                type="text"
                class="form-control form-control-sm"
                placeholder="Enter username"></b-form-input>
              <small v-if="errors[0]" class="form-text text-danger">
                {{ errors[0] }}
              </small>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
            <b-form-group
              id="email-group"
              label="Email"
              label-for="email">
              <b-form-input
                id="email-input"
                type="email"
                name="email"
                placeholder="Email"
                class="form-control form-control-sm"
                v-model="user.email"
              />
              <small v-if="errors[0]" class="form-text text-danger">
                {{ errors[0] }}
              </small>
            </b-form-group>
          </ValidationProvider>
          <ValidationObserver>
            <ValidationProvider
              name="Password"
              rules="required|min:8|max:100|password:@confirm"
              v-slot="{ errors }">
              <b-form-group
                id="password-group"
                label="Password"
                label-for="password">
                <b-form-input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  class="form-control form-control-sm"
                  v-model="user.password"
                />
                <small v-if="errors[0]" class="form-text text-danger">
                  {{ errors[0] }}
                </small>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider name="confirm" vid="confirm" rules="required" v-slot="{ errors }">
              <b-form-group
                id="confirm-password-group"
                label="Confirm Password"
                label-for="confirm-password">
                <b-form-input
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  class="form-control form-control-sm"
                  v-model="user.confirmPassword"
                />
                <small v-if="errors[0]" class="form-text text-danger">
                  {{ errors[0] }}
                </small>
              </b-form-group>
            </ValidationProvider>
          </ValidationObserver>
          <div class="button-set">
            <button class="btn btn-outline-primary mr-3" v-loading="isLoading">
              Register
            </button>
            <a href="#" @click.prevent="login">Login</a>
          </div>
        </b-form>
      </div>
      <div id="bp-right" class="col">
      </div>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import { extend } from 'vee-validate';

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});

export default {
  name: 'RegisterModal',
  props: {
    login: { type: Function },
  },
  data() {
    return {
      user: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
      isLoading: false,
    };
  },
  methods: {
    show() {
      this.$modal.show('register-modal');
    },
    hide() {
      this.$modal.hide('register-modal');
    },
    ...mapActions('user', ['loginUser', 'registerUser']),
    register() {
      this.isLoading = true;

      this.registerUser({ user: this.user })
        .then(() => {
          this.isLoading = false;

          this.hide();
          this.$notify({
            group: 'auth',
            type: 'success',
            title: 'Registration Successful',
            text: '',
          });

          this.$router.push('home');
        }).catch((error) => {
          this.isLoading = false;

          this.$notify({
            group: 'auth',
            type: 'error',
            title: 'Registration Error',
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
  border-left: 1px solid #eee;
  background: url("/img/panorama.jpg") 0px 0px no-repeat;
  background-position: center;
  background-color: #c0bb9e;
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
