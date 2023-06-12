<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="main-container">
    <RouterLink to="/login" custom v-slot="{ navigate }">
      <button class="btn" @click="navigate" role="link">Login</button>
    </RouterLink>

    <img class="logo" src="./Logo.png" width="200" height="150" />
  </div>
</template>

<style scoped>
.main-container {
  height: 100px;
}

.btn {
  font-family: "Playfair Display";
  background-color: #0a1828;
  border-radius: 40%;
  padding: 10px;
  font-weight: 500;
  font-size: 20px;
  color: #f7f7f7;
  text-decoration: none;
  position: relative;
  left: 90%;
  top: -55px;
}

.logo {
  margin-top: 10px;
}

.btn:hover {
  color: #0088a9;
  transition: all 0.3s;
}
</style>
