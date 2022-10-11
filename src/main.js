import { defineCustomElement } from "vue";

import WidgetApp from "./WidgetApp.ce.vue";

const MyVueElement = defineCustomElement(WidgetApp);

customElements.define("my-vue-element", MyVueElement);
