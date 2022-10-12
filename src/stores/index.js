import { createPinia, setActivePinia } from "pinia";

setActivePinia(createPinia());

//router.js
import { useRouterStore } from "@/stores/router/router";

export { useRouterStore };

//urls.js
import { MEDIA, setMedia } from "@/stores/urls/urls";

export { MEDIA, setMedia };

//inventoryConfig.js
import {
    imageSize,
    setImageCover,
} from "@/stores/inventoryConfig/inventoryConfig";

export { imageSize, setImageCover };
