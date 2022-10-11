import { defineCustomElement } from "vue";
// import { createPinia } from "pinia";
import WidgetApp from "./WidgetApp.ce.vue";

const MyVueElement = defineCustomElement(WidgetApp);

// app.use(createPinia());
// app.mount("#app");
customElements.define("my-vue-element", MyVueElement);
