import { createPinia, setActivePinia } from "pinia";

setActivePinia(createPinia());

//router.js
export { useRouterStore } from "@/stores/router/router";

//urls.js
export { MEDIA, setMedia } from "@/stores/urls/urls";

//inventoryConfig.js
export {
    imageSize,
    setImageCover,
} from "@/stores/inventoryConfig/inventoryConfig";
