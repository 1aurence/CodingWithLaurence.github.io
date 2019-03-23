<template>
  <div>
    <h1 class="mb-4 text-center">Your Saved Articles</h1>
    <div class="article-container">
      <div class="card card-body shadow-sm" v-for="(article, index) in articles" :key="index">
        <img :src="article.urlToImage" alt>
        <h2>{{ article.title }}</h2>
        <small class="text-muted">Posted on: {{ article.publishedAt }}</small>
        <p>{{ article.description }}</p>
        <router-link :to="{ name: 'ViewArticle', params: {article} }">View full article</router-link>
        <button @click="unsaveArticle(article)" class="btn btn-sm btn-outline-primary">Unsave</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      articles: []
    };
  },
   beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push({ name: "LogIn" });
    }
  },
  firestore() {
    return {
      articles: db
        .collection("saved_articles")
        .where("user", "==", this.$session.get("user"))
    };
  },
  methods: {
    unsaveArticle(article) {
      db.collection('saved_articles').doc(article['.key']).delete()
    }
  }
};
</script>
<style scoped lang="scss">
img {
  height: 200px;
}
.article-container {
  display: grid !important;
  grid-template-columns: repeat(3, 25%);
  grid-template-rows: auto;
  grid-gap: 2%;
  justify-content: center;

}
</style>
