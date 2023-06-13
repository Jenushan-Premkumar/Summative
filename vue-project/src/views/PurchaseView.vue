<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useStore } from "../store/index.js";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const showModal = ref(false);
const selectedRecordId = ref(0);
const store = useStore();
const page = ref(1);
const totalPages = ref(1);
const currentURL = ref();

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

const toggleModal = (id) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = id;
};

store.movies = movies.results.map((movie) => {
  return {
    id: movie.id,
    poster: movie.poster_path,
  };
});

const getTMDBData = async (url, options, page) => {
  const movies = (
    await axios.get(url, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        region: "US",
        language: "en",
        include_adult: false,
        page,
        ...options,
      },
    })
  ).data;
  store.movies = movies.results.map((movie) => {
    return {
      id: movie.id,
      poster: movie.poster_path,
    };
  });
  console.log(movies.total_pages);
  totalPages.value = movies.total_pages;
  currentURL.value = url;
};
</script>

<template>
  <select class="select-box"
    v-model="genre"
    @change="
      getTMDBData('https://api.themoviedb.org/3/discover/movie', {
        with_genres: genre,
      })
    "
  >
    <option value="28">Action</option>
    <option value="10751">Family</option>
    <option value="878">Science Fiction</option>
    <option value="12">Adventure</option>
    <option value="14">Fantasy</option>
    <option value="10770">TV Movie</option>
    <option value="16">Animation</option>
    <option value="36">History</option>
    <option value="53">Thriller</option>
    <option value="35">Comedy</option>
    <option value="27">Horror</option>
    <option value="10752">War</option>
    <option value="80">Crime</option>
    <option value="10402">Music</option>
    <option value="37">Western</option>
    <option value="99">Documentary</option>
    <option value="9648">Mystery</option>
    <option value="18">Drama</option>
    <option value="10749">Romance</option>
  </select>

  <input type="search" placeholder="Enter search items" v-model="search" />
  <button
    @click="
      getTMDBData('https://api.themoviedb.org/3/search/movie', {
        query: search,
      })
    "
  >
    Search
  </button>

  <button class="carts" @click="router.push('/cart')">
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
  <div class="pagination">
    <button
      @click="
        getTMDBData(
          currentURL,
          {
            query: search,
            with_genres: genre,
          },
          page === 1 ? 1 : page--
        )
      "
    >
      Prev
    </button>
    <p>{{ `Page ${page} of ${totalPages}` }}</p>
    <button
      @click="
        getTMDBData(
          currentURL,
          {
            query: search,
            with_genres: genre,
          },
          page >= totalPages ? totalPages : page++
        )
      "
    >
      Next
    </button>
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

.select-box{
  margin-left: 15px;
}

.poster {
  width: 265px;
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
  border: 10px solid;
  border-color: white;
}

.carts {
  margin-left: 700px;
}

button {
  margin-top: 10px;
  width: 120px;
  border-color: #0a1828;
  background-color: #0a1828;
  color: white;
}
.cart {
  width: 100px;
}
.pagination {
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;
  gap: 2rem;
}
</style>
