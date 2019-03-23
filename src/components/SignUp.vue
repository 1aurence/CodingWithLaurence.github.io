<template>
  <div class="w-50">
    <div v-if="accountCreated">
      <div class="alert alert-success">Your account has been created!</div>
      <router-link :to="{name: 'LogIn'}" class="btn btn-primary">Log In</router-link>
    </div>
    <form v-if="!accountCreated" class="bg-dark p-5 form shadow-sm rounded">
      <div class="alert alert-warning" v-if="form.error">{{form.errorMsg}}</div>
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
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
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
      <div class="form-group">
        <label for="exampleInputPassword2">Password</label>
        <input
          v-model="form.password2"
          type="password"
          class="form-control"
          id="exampleInputPassword2"
          placeholder="Retype Password"
        >
      </div>

      <button @click.prevent="signUp" class="btn btn-primary">Create Account</button>
      <br>
      <small class="mt-3">
        Already have an account?
        <router-link :to="{ name: 'LogIn' }">Sign in</router-link>
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
        password: "",
        password2: "",
        error: false,
        errorMsg: null
      },
      accountCreated: false
    };
  },
  beforeCreate() {
    if (this.$session.exists()) {
      this.$router.push({ name: "HomePage" });
    }
  },
  methods: {
    async signUp() {
      try {
        if (this.form.password !== this.form.password2) {
          throw new Error("Passwords do not match");
        }
        let newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password);

        if (newUser) {
          let { email, uid } = newUser.user;
          console.log(email, uid)
          let user = {
            email,
            uid
          };
          db.collection("users").add(user);
          this.accountCreated = true
        }
      } catch (err) {
        console.log(err.message);
        this.form.errorMsg = err.message;
        this.form.error = true;
        this.form.password = "";
        this.form.password2 = "";
      }
    }
  }
};
</script>
