import { defineStore } from "pinia";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";

export const useStore = defineStore("store", {
  state: () => ({
    movies: [],
    cart: [],
    user: undefined,
  }),
  actions: {
    async addToCart(poster, title) {
      console.log(this.cart);
      this.cart.push({
        poster,
        title,
      });
      console.log(this.cart);
      await setDoc(doc(firestore, "carts", this.user.email), {
        cart: this.cart,
      });
    },
    async removeFromCart(index) {
      this.cart.splice(index, 1);
       delete setDoc(doc(firestore, "carts", this.user.email), {
        cart: this.cart,
      });
    },
  },
});
