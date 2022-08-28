import { defineCustomElement } from 'vue'
// import { createPinia } from "pinia";
import App from "./App.ce.vue";

const MyVueElement = defineCustomElement(App);

// app.use(createPinia());
// app.mount("#app");
customElements.define("my-vue-element", MyVueElement);
