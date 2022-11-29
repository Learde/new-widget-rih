<script setup>
import { ref, onMounted } from "vue";
import { setBaseUrl, setToken } from "@api";
import { pushFontToHead } from "@helpers";
import { storeToRefs } from "pinia";
import {
    useRouterStore,
    initGeneralPropsStore,
    setMedia,
    useClientStore,
    generalProps,
} from "@stores";
import importedProps from "@/props";
import TheTopMenu from "@/components/TheTopMenu/TheTopMenu.vue";
import TheFixedCart from "@/components/TheCartFixed/TheCartFixed.vue";
import ModalAuth from "@/components/ModalAuth/ModalAuth.vue";

const props = defineProps({ ...importedProps });

setToken(props.token);
if (props.devServer) {
    setBaseUrl("https://api-dev.rentinhand.ru/");
    setMedia("https://media-dev.rentinhand.ru");
}
initGeneralPropsStore(props);

const router = useRouterStore();
const { current } = storeToRefs(router);

const clientStore = useClientStore();
const { setClient, setAuthModal } = clientStore;

const { authorization } = generalProps;
if (authorization && localStorage.getItem("client")) {
    setClient(JSON.parse(localStorage.getItem("client")));
}

const modalAuth = ref(null);

onMounted(() => {
    setAuthModal(modalAuth.value);
});

// Добавление шрифта Manrope к странице
pushFontToHead();
</script>

<template>
    <div class="rih-widget" id="rih-widget">
        <TheTopMenu @open-auth="modalAuth.show()" />
        <component :is="current.component" v-bind="current.params"></component>
        <TheFixedCart />
        <ModalAuth ref="modalAuth" />
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
