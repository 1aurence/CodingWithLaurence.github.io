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
      user: null
    };
  },
  firebase() {
    user: db.collection("users").where("uid", "==", this.$session.get("user"));
  },

  mounted() {
      console.log(this.user)

  }
};
//    articles: db
        // .collection("saved_articles")
        // .where("user", "==", this.$session.get("user"))
    // };
</script>

