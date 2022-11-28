import { defineCustomElement } from "vue";

import WidgetApp from "./WidgetApp.ce.vue";

const RihWidget = defineCustomElement(WidgetApp);

customElements.define("rih-widget", RihWidget);
