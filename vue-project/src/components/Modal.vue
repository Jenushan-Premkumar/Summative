<script setup>
import axios from "axios";
import { useStore } from "../store";
const movieStore = useStore();
const store = useStore();
const props = defineProps(["id"]);

const movie = (
  await axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      region: "US",
      language: "en",
      include_adult: false,
      append_to_response: "videos",
    },
  })
).data;
</script>

<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <div class="modal-inner-container">
        <button @click="$emit('toggleModal')">X</button>
        <div v-if="movie">
          <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
          <div class="text">
            <h1>{{ movie.title }}</h1>
            <h2>Release Date: {{ movie.release_date }}</h2>
            <h3>{{ movie.overview }}</h3>
            <button
              class="buy"
              @click="store.addToCart(movie.poster_path, movie.title)"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-outer-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 3;
}

.modal-outer-container .modal-inner-container {
  background-color: #000000;
  color: white;
  width: 1100px;
  height: 575px;
  position: relative;
}

.modal-outer-container .modal-inner-container button {
  position: absolute;
  right: 0px;
  padding: 1rem;
  border: none;
  background: #000000;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
}

.modal-outer-container .modal-inner-container .icon {
  font-size: 1.25rem;
  color: white;
}

img {
  margin-top: 50px;
  margin-left: 50px;
  float: left;
  width: 300px;
  padding-right: 5px;
  border-color: white;
  border-width: 10px;
}

h1 {
  margin-left: 450px;
  margin-right: 125px;
  text-align: center;
}

h2 {
  margin-left: 600px;
}

h3 {
  margin-left: 400px;
  margin-right: 90px;
  text-align: center;
}

.buy {
  cursor: pointer;
  margin-right: 350px;
  border-color: white;
}
</style>
