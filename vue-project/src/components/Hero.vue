<script setup></script>

<template>
  <div class="content-wrapper">
    <img src="./hero.jpeg" class="hero" alt="" />
    <p class="text">
      Explore free movies with Movieplex today! <br />
      Login to start Streaming NOW
    </p>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");

* {
  padding: 0;
  margin: 0;
}

body {
  width: 100%;
  height: 600px;
}
.content-wrapper {
  width: 100%;
  margin-top: 90px;
  height: 600px;
}

.content-wrapper img {
  width: 100%;
  top: 100px;
}

.text {
  color: rgb(250, 248, 248);
  position: relative;
  bottom: 400px;
  left: 10px;
  font-family: "Russo One", sans-serif;
  font-size: 55px;
}

.hero {
  max-width: 100%;
  height: 600px;
  filter: brightness(25%);
  background-position: center center;
  object-fit: cover;
}
</style>
