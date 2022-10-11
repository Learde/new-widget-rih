import { createPinia, setActivePinia } from "pinia";

setActivePinia(createPinia());

import { useRouterStore } from "@/stores/router/router";

export { useRouterStore };
