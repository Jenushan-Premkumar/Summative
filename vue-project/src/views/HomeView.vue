<script setup>
import Header from "../components/Header.vue";
import Hero from "../components/Hero.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import { useStore } from "../store/index.js";
console.log (import.meta.env.VITE_TMDB_API_KEY) 
const store = useStore();
const movies = (
  await axios.get("https://api.themoviedb.org/3/movie/popular", {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      region: "US",
      language: "en",
      include_adult: false,
    },
  })
).data;

store.movies = movies.results.map((movie) => {
  return {
    id: movie.id,
    poster: movie.poster_path,
  };
});
</script>

<template>
  <div>
    <Header />
    <Hero />
    <Footer />
  </div>
</template>

<style scoped></style>
