<script setup>
import { useStore } from "../store/index.js";

const store = useStore();
</script>

<template>
  <div>
    <div v-for="(movie, index) in store.cart" key:index>
      <h1>{{ movie.title }}</h1>
      <img
        class="image"
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`"
      />
      <button class="btn" @click="store.removeFromCart(index)">
        <img class="trash" src="./trash.png" alt="" />
      </button>
    </div>
  </div>
</template>

<style>
.image {
  margin-top: 0px;
  margin-left: 25px;
  width: 300px;
  padding-right: 5px;
  border-color: white;
  border-width: 30px;
  flex: left;
}

h1 {
  color: white;
  margin-left: 25px;
}

.trash {
  width: 50px;
}

.btn {
  color: #0a1828;
  margin-left: 10px;
}
</style>
