<template>
  <div>
    <header class="text-center mb-3">
      <h1>Welcome to NewsCenter</h1>
      <h4>Check out some of the sections below to get started...</h4>
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a
            class="nav-link active"
            href="#"
            @click="getNews('https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=3077a2e3e4f94552b071d1e2666fb582')"
          >Bitcoin</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            @click="getNews('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3077a2e3e4f94552b071d1e2666fb582')"
          >Business</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            @click="getNews('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3077a2e3e4f94552b071d1e2666fb582')"
          >Technology</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
            @click="getNews('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=3077a2e3e4f94552b071d1e2666fb582')"
          >WallStreet</a>
        </li>
      </ul>

      <div class="search my-3">
        <input
          type="text"
          v-on:keyup.enter="searchArticles"
          v-model="search"
          class="mr-1"
          placeholder="Search for other news..."
        >
        <button class="btn btn-primary" @click="searchArticles">Search</button>
      </div>
      <div>
        <b-dropdown id="ddown1" text="Filter Results" class="m-md-2">
          <b-dropdown-item @click="filterResults('publishedAt')">Most Recent</b-dropdown-item>
          <b-dropdown-item @click="filterResults('popularity')">Popularity</b-dropdown-item>
          <b-dropdown-item @click="filterResults('relevancy')">Relevancy</b-dropdown-item>
        </b-dropdown>
      </div>
    </header>
    <div class="alert alert-success w-25 m-auto" v-if="saveAlert">Article has been saved</div>
    <div class="alert alert-warning w-25 m-auto" v-if="error.status">{{ error.msg }}</div>

    <div class="article-container">
      <div class="card card-body shadow-sm" v-for="(article, index) in paginatedNews" :key="index">
        <img :src="article.urlToImage" alt>
        <h2>{{ article.title }}</h2>
        <small class="text-muted mb-2">Posted on: {{ article.publishedAt }}</small>
        <p>{{ article.description }}</p>
        <div class="options">
          <div class="d-flex">
            <router-link
              :to="{ name: 'ViewArticle', params: {article} }"
              class="mr-3"
            >View full article</router-link>
            <a v-bind:href="article.url" target="_blank">View Source</a>
          </div>
          <button
            @click="saveArticle(article)"
            class="btn btn-sm btn-outline-primary mt-3"
          >Save Article</button>
        </div>
      </div>
    </div>

    <div class="page-nav d-flex justify-content-center mb-3">
      <button class="btn btn-primary mr-2" @click="prevPage">Previous</button>
      <button class="btn btn-primary" @click="nextPage">Next</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import firebase from "firebase";
import axios from "axios";
import { db } from "../firebase";
export default {
  data() {
    return {
      currentNews: {
        articles: [],
        start: 0,
        stop: 5
      },
      search: "",
      saveAlert: false,
      currentEndpoint: null,
      currentFilter: null,
      error: {
        msg: null,
        status: false
      }
    };
  },
  mounted() {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=3077a2e3e4f94552b071d1e2666fb582"
      )
      .then(res => {
        this.currentNews.articles = res.data.articles;
        this.currentEndpoint = "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=3077a2e3e4f94552b071d1e2666fb582"

      })
      .catch(err => console.log(err));
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push({ name: "LogIn" });
    }
  },
  computed: {
    paginatedNews() {
      let articles = this.currentNews.articles.slice(
        this.currentNews.start,
        this.currentNews.stop
      );
      return articles;
    }
  },
  methods: {
    getNews(url) {
      axios
        .get(url)
        .then(res => {
          this.currentNews.articles = res.data.articles;
        })
        .catch(err => console.log(err));
    },
    searchArticles() {
      const url = `https://newsapi.org/v2/everything?q=${
        this.search
      }&from=2019-02-22&sortBy=publishedAt&apiKey=3077a2e3e4f94552b071d1e2666fb582`;
      axios
        .get(url)
        .then(res => (this.currentNews.articles = res.data.articles))
        .catch(err => {
          this.error.status = true
          this.error.msg = err.message
          setTimeout(() => {
          this.error.status = false

          }, 2500);
        });
    },
    saveArticle(article) {
      this.saveAlert = true;
      setTimeout(() => {
        this.saveAlert = false;
      }, 2500);
      article.user = this.$session.get("user");
      db.collection("saved_articles").add(article);
    },
    nextPage() {
      if (this.currentNews.stop + 5 >= !this.currentNews.articles.length) {
        this.currentNews.start = this.currentNews.start += 5;
        this.currentNews.stop = this.currentNews.stop += 5;
      }
    },
    prevPage() {
      if (this.currentNews.start !== 0) {
        this.currentNews.start = this.currentNews.start -= 5;
        this.currentNews.stop = this.currentNews.stop -= 5;
      }
    },
    filterResults(filter) {
      let regex = /\w+(?=&apiKey)/gm;
      let currentFilter = this.currentEndpoint.match(regex)
      if(currentFilter !== filter) {
        let newUrl = this.currentEndpoint.replace(currentFilter, filter)
        this.currentEndpoint = newUrl
        this.currentFilter = filter
        axios.get(newUrl)
        .then(res => this.currentNews.articles = res.data.articles)
      } 
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-item {
  font-size: 2rem;
}
img {
  height: 200px;
}
.search {
  height: 45px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  & input {
    font-size: 1.5rem;
  }
  & button {
    height: 90%;
  }
}
.article-container {
  display: grid ;
  grid-template-columns: repeat(3, 25%);
  grid-template-rows: max-content;
  grid-gap: 2%;
  justify-content: center;
  @media screen and (max-width: 1350px) {
      grid-template-columns: repeat(2, 35%);
  }
    @media screen and (max-width: 945px) {
      grid-template-columns: 75%;
  }
}
.page-nav {
  margin-top: 3%;
}
.alert {
  padding: 1%;
}
</style>
