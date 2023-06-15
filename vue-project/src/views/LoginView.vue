<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "@firebase/firestore";

const store = useStore();
const router = useRouter();
const email = ref("");
const passwordOne = ref("");
const passwordTwo = ref("");

const registerViaEmail = async () => {
  if (passwordOne.value !== passwordTwo.value) {
    alert("Password incorrect!");
    return;
  }

  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.value,
    passwordOne.value
  );
  store.user = user;
  router.push("/purchase");
};

const loginViaEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      passwordOne.value
    );
    store.user = user;
    router.push("/purchase");
  } catch (error) {
    console.log(error);
  }
};

const registerViaGoogle = async () => {
  const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
  store.user = user;
  const cart = await getDoc(doc(firestore, "carts", user.email));

  if (cart.exists()) {
    store.cart = cart.data().cart;
  } else {
    await setDoc(doc(firestore, "carts", user.email), { cart: [] });
    store.cart = cart.data().cart;
  }
  router.push("/purchase");
};
</script>

<template>
  <div class="form">
    <div>
      <h1>Login via Email</h1>
      <form class="login" @submit.prevent="loginViaEmail()">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="passwordOne" type="password" placeholder="Password" />

        <input type="submit" value="Login" />
      </form>
    </div>
    <hr />
    <h1>Register via Email</h1>
    <form class="setup" @submit.prevent="registerViaEmail()">
      <input v-model="email" type="email" placeholder="Email" />
      <input
        v-model="passwordOne"
        type="password"
        placeholder="Enter Password"
      />
      <input
        v-model="passwordTwo"
        type="password"
        placeholder="Re-enter Password"
      />
      <input type="submit" value="Register" />
    </form>
    <hr />
    <div class="google">
      <button @click="registerViaGoogle()">Login via Google</button>
    </div>
  </div>
</template>

<style scoped>
.form {
  font-family: "Roboto", sans-serif;
  position: relative;
  z-index: 1;
  background: #ffffff;
  opacity: 99%;
  max-width: 260px;
  margin: 125px auto 100px;
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

.setup,
.login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.google {
  text-align: center;
  margin-top: 25px;
}

h1 {
  color: black;
  font-size: 20px;
}
</style>
