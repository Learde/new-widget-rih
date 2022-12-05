import { createPinia, setActivePinia } from "pinia";

setActivePinia(createPinia());

// Stores

//router.js
export { useRouterStore } from "@stores/router/router";

//urls.js
export { MEDIA, setMedia } from "@stores/urls/urls";

//inventoryConfig.js
export {
    imageSize,
    setImageCover,
} from "@stores/inventoryConfig/inventoryConfig";

//cart.js
export { useCartStore } from "./cart/cart.js";

//client.js
export { useClientStore } from "./client/client.js";

// Props

//generalProps.js
export { generalProps } from "./generalProps/generalProps.js";
export { initGeneralPropsStore } from "./generalProps/helpers.js";

//generalProps.js
export { filterProps } from "./filtersProps/filterProps.js";
export { initFilterPropsStore } from "./filtersProps/helpers.js";
