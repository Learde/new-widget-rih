<script setup>
import { setBaseUrl, setToken } from "@api";
import { pushFontToHead } from "@helpers";
import { storeToRefs } from "pinia";
import { useRouterStore, initGeneralPropsStore, setMedia } from "@stores";
import importedProps from "@/props";
import TheTopMenu from "@/components/TheTopMenu/TheTopMenu.vue";

const props = defineProps({ ...importedProps });

setToken(props.token);
if (props.devServer) {
    setBaseUrl("https://api-dev.rentinhand.ru/");
    setMedia("https://media-dev.rentinhand.ru");
}
initGeneralPropsStore(props);

const router = useRouterStore();
const { current } = storeToRefs(router);

// Добавление шрифта Manrope к странице
pushFontToHead();
</script>

<template>
    <div class="rih-widget" id="rih-widget">
        <TheTopMenu />
        <component :is="current.component" v-bind="current.params"></component>
    </div>
</template>

<style lang="scss">
@import "assets/main";
.rih-widget {
    width: 100%;
    box-sizing: border-box;

    * {
        box-sizing: border-box;
        font-family: "Manrope", sans-serif;
    }

    *::placeholder {
        color: #333 !important;
        opacity: 0.5 !important;
    }
}
</style>
