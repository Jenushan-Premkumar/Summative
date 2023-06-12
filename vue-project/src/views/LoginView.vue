<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const login = () => {
  if (username.value === "tmdb" && password.value === "movies") {
    router.push("/purchase");
  } else {
    alert("Invalid username/password!");
  }
  console.log(username.value, password.value);
};
</script>

<template>
  <form class="form" @submit.prevent="login()">
    <p>Login</p>

    <input type="text" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <button>login</button>
  </form>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
}

.form {
  font-family: "Roboto", sans-serif;
  position: relative;
  z-index: 1;
  background: #ffffff;
  opacity: 99%;
  max-width: 260px;
  margin: 200px auto 100px;
  padding: 10px 45px 30px 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-radius: 10px;
}

.form p {
  font-size: 15px;
  padding: 1px;
  text-align: center;
}

.form input {
  outline: 0;
  border-radius: 10px;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  box-sizing: border-box;
  font-size: 14px;
}

.form input:hover {
  background-color: #d3f8f9;
  transition: all is ease 0s;
}

.form input:focus {
  background-color: #d3f8f9;
  transition: all is ease 0s;
}

.form button {
  text-transform: uppercase;
  outline: 0;
  border-radius: 10px;
  background: #1adbe5;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background-color: #06c5cf;
  transition: all 1s ease 0s;
}
</style>
