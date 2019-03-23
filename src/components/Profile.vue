<template>
  <div>
    <div class="card card-body shadow-sm">
      {{user}}
      <!-- <h3>{{user.email}}</h3> -->
      <hr>
      <small>Joined on:</small>
      <p>Saved posts: 10</p>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      user: []
    };
  },
  firebase() {
    user: db.collection("users").where("email", "==", 'mom@aol.com');
  },

  mounted() {
      console.log(this.user)

  }
};
</script>

