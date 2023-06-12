<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useStore } from "../store/index.js";
import { useRouter } from "vue-router";

const router = useRouter();
const showModal = ref(false);
const selectedRecordId = ref(0);
const store = useStore();

const toggleModal = (id) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = id;
};
</script>

<template>
  <button @click="router.push('/cart')">
    <img class="cart" src="./cart.png" />
  </button>
  <div id="container">
    <div v-if="store.movies" class="tiles">
      <div v-for="movie in store.movies" class="tile">
        <img
          class="poster"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`"
          @click="toggleModal(movie.id)"
        />
      </div>
    </div>
  </div>
  <Modal v-if="showModal" :id="selectedRecordId" @toggleModal="toggleModal()" />
</template>

<style scoped>
#container {
  width: 100%;
}

.tiles {
  display: flex;
  flex-wrap: wrap;
}

.poster {
  width: 265px;
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
  border: 10px solid;
  border-color: white;
}

button {
  margin-left: 1125px;
  margin-top: 10px;
  width: 120px;
  border-color: #0a1828;
  background-color: #0a1828;
}
.cart {
  width: 100px;
}
</style>
