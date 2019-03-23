<template>
  <div>
      <div class="post">
      <img :src="article.urlToImage" alt="">
      <h1>{{ article.title }}</h1>
        <p class="text-muted">Posted on: {{ article.publishedAt }} by: {{ article.author || N/A }}</p>
        <p class="content">{{article.content}}</p>
  <a v-bind:href="article.url" target="_blank">View Source</a>
  </div>
<a @click="$router.go(-1)" class="btn btn-primary text-white">Go Back</a>
  </div>
</template>

<script>
export default {
    props: ['article'],
  data() {
    return {};
  },
  
};
</script>
<style scoped lang="scss">
.content {
    font-size: 1.3rem;
    text-align: left;
}
.post {
  text-align: center;
}
img {
  height: 250px;
}
a {
  cursor: pointer;
}
</style>
