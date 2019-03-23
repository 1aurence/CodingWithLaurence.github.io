<template>
  <div>
    <form class="w-50 bg-dark p-5 form shadow-sm rounded">
        <div class="alert alert-warning" v-if="authError.status">{{ authError.msg }}</div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        >
      </div>

      <button @click.prevent="signIn" class="btn btn-primary">Log In</button>
      <br>
      <small class="mt-3">Dont have an account?
        <router-link class="ml-2" :to="{ name: 'SignUp' }">Sign up</router-link>
      </small>
    </form>
  </div>
</template>
<script>
import firebase from "firebase";
import { db } from "../firebase";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      authError: {
          status: false,
          msg: ''
      }
    };
  },
beforeCreate() {
  if(this.$session.exists()) {
    this.$router.push({name: 'HomePage'})
  }
},
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(res => {
            this.$session.start()
            this.$session.set('user',firebase.auth().currentUser.uid)
            this.$router.push({name: 'HomePage'})
        })
        .catch(err => {
            this.authError.msg = err.message
            this.authError.status = true, this.form.password = ''
        });
    }
  }
};
</script>
<style>

</style>
