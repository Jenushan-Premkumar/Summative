import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import "c:/Users/334506615/Summative/vue-project/src/assets/main.css";

const store = createPinia();

createApp(App).use(router).use(store).mount("#app");
