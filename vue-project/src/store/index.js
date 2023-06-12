import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    movies: [],
    cart: [],
  }),
  actions: {
    async addToCart(poster, title) {
      this.cart.push({
        poster,
        title,
      });
      console.log(this.cart);
      await setDoc(doc(firestore, "carts", this.user.email), { cart: this.cart });
    },
  },
});
