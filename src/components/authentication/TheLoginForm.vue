<template>
  <div class="wrapper" v-if="authMode == 'login'">
    <div class="q-mb-lg">
      <div class="loginHeader">Login</div>
      <div class="loginSubText">Please sign in to continue.</div>
    </div>

    <q-input
      color="secondary"
      outlined
      v-model="username"
      label="Email"
      type="email"
      :rules="[(val) => val.length <= 3 || 'Please use maximum 3 characters']"
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>
    <q-input
      color="secondary"
      outlined
      v-model="password"
      label="Password"
      type="password"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
      <template v-slot:append>
        <q-btn flat style="font-weight: bold" color="primary" label="FORGOT" />
        <!-- <div class="forgot-pass-btn">FORGOT</div> -->
        <!-- <q-btn @click="login" color="primary" class="">Forgot</q-btn> -->
      </template>
    </q-input>
    <div class="row justify-end">
      <q-btn
        @click="login"
        size="18px"
        icon-right="login"
        color="primary"
        class="q-mb-xs q-mt-lg"
        >Login</q-btn
      >
    </div>
    <div class="no-account-wrapper">
      Don't have an account? <span @click="authMode = 'signup'">Sign Up</span>
    </div>
  </div>

  <div class="wrapper" v-if="authMode == 'signup'">
    <div class="q-mb-lg">
      <div class="loginHeader">Create Account</div>
      <div class="loginSubText">Create an account to contribute.</div>
    </div>
    <q-input
      color="secondary"
      class="q-mb-md"
      outlined
      v-model="username"
      label="Email"
      type="email"
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>
    <q-input
      color="secondary"
      class="q-mb-md"
      outlined
      v-model="password"
      label="Password"
      type="password"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
    </q-input>
    <q-input
      color="secondary"
      class="q-mb-md"
      outlined
      v-model="password"
      label="Confirm Password"
      type="password"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
    </q-input>
    <div class="row justify-end">
      <q-btn
        @click="accountCreate"
        size="18px"
        color="primary"
        icon-right="login"
        class="q-mb-xs q-mt-md"
        >Sign Up</q-btn
      >
    </div>

    <div class="no-account-wrapper">
      Already have an account? <span @click="authMode = 'login'">Sign In</span>
    </div>
  </div>

  <div class="wrapper" v-if="authMode == 'verify'">
    <div class="q-mb-lg">
      <div class="loginHeader">Verify Account</div>
      <div class="loginSubText">Check email to get verification code.</div>
    </div>
    <q-input
      color="secondary"
      class="q-mb-md"
      outlined
      style="width: 60vw"
      v-model="verifyCode"
      label="Verify Account"
      type="text"
    ></q-input>
    <q-btn
      @click="confirmSignup"
      size="18px"
      color="primary"
      class="q-mb-xs q-mt-md"
      >Verify Account</q-btn
    >
    <div class="no-account-wrapper">
      Did not get a code? <span @click="resendAuthCode">Resend</span>
    </div>
  </div>

  <div class="wrapper" v-if="authMode == 'userPage'">
    <div class="q-mb-lg">
      <div class="loginHeader">User Information</div>
    </div>
    <div style="font-size: 18px">
      Welcome <b>{{ userInfo.email }}</b
      >, your information is below!
    </div>
    <br />
    {{ userInfo }}
    <br />
    <q-btn
      @click="logoutUser"
      size="18px"
      color="primary"
      class="q-mb-xs q-mt-md"
      >Logout</q-btn
    >
    <br />

    <q-btn
      @click="exampleApiRequest"
      size="18px"
      color="primary"
      class="q-mb-xs q-mt-md"
      >Example protected API request</q-btn
    >
    <br />
    <div>User info from protected route goes here</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // loginMode: 'login',
      username: 'matthew.d.silveira@gmail.com',
      password: 'Pass1234!',
      verifyCode: '',
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.authStore.userInfo;
    },
    authMode: {
      get() {
        return this.$store.state.authStore.authMode;
      },
      set(value) {
        this.$store.state.authStore.authMode = value;
      },
    },
  },
  methods: {
    accountCreate() {
      // validate that the two passwords match here

      this.$store.dispatch('createAccount', {
        email: this.username,
        password: this.password,
      });
    },
    login() {
      this.$store.dispatch('login', {
        email: this.username,
        password: this.password,
      });
    },
    logoutUser() {
      this.$store.dispatch('logoutUser');
    },

    confirmSignup() {
      this.$store.dispatch('confirmSignup', {
        email: this.username,
        verifyCode: this.verifyCode,
      });
    },
    resendAuthCode() {
      console.log('resend auth code', this.verifyCode);
    },

    getCurrentUserSession() {
      this.$store.dispatch('getCurrentUserSession');
    },
    exampleApiRequest() {
      this.$store.dispatch('getUserInfo');
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 20px;
  text-align: left;
}
.loginHeader {
  font-size: 40px;
  font-weight: bold;
}
.loginSubText {
  font-size: 20px;
  font-weight: bold;
  color: darkgray;
}
.no-account-wrapper {
  margin-top: 50px;
  font-size: 20px;
  text-align: center;
}
.no-account-wrapper span {
  font-weight: bold;
  font-size: 22px;
  color: var(--q-primary) !important;
}
.forgot-pass-btn {
  font-weight: bold;
  font-size: 16px;
  color: var(--q-primary) !important;
}
</style>
