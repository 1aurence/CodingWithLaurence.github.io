<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-5 py-2 shadow-sm">
    <router-link id="logo" class="nav-link" :to="{name: 'HomePage'}">NewsCenter</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" v-if="loggedIn" :to="{name: 'SavedArticles'}">My news</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="!loggedIn">
          <router-link class="nav-link" :to="{name: 'LogIn'}">Log In</router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
          <router-link class="nav-link" :to="{name: 'SignUp'}">Sign Up</router-link>
        </li>
         <li class="nav-item" v-if="loggedIn">
          <router-link class="nav-link" :to="{name: 'Profile'}">Profile</router-link>
        </li>
        <li class="nav-item" v-if="loggedIn">
          <a class="nav-link btn-link" href="#" @click="logOut">Log Out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      this.$session.destroy();
      this.$router.push({ name: "LogIn" });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(res => {
      if (this.$session.exists()) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.router-link-exact-active {
  color: darken(#888, 10);
  font-weight: bold;
}
a {
  color: #888 !important;
}
#logo {
  font-size: 1.2rem;
}
</style>

