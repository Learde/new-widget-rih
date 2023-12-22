<script setup>
import { ref, onMounted } from "vue";
import { setBaseUrl, setToken, getSettings } from "@api";
import { pushFontToHead } from "@helpers";
import { storeToRefs } from "pinia";
import {
    useRouterStore,
    initGeneralPropsStore,
    initFilterPropsStore,
    initColorsPropsStore,
    initBookingPropsStore,
    setMedia,
    useClientStore,
    generalProps,
    useRentStore,
    setCurrencyIcon,
} from "@stores";
import importedProps from "@/props";
import TheTopMenu from "@/components/TheTopMenu/TheTopMenu.vue";
import TheFixedCart from "@/components/TheCartFixed/TheCartFixed.vue";
import ModalAuth from "@/components/ModalAuth/ModalAuth.vue";
import ModalSuccess from "@/components/ModalSuccess/ModalSuccess.vue";
import { useTrans } from "@packages/lang";

const { setTranslations } = useTrans();

const props = defineProps({ ...importedProps });

setTranslations(props.locale);

setToken(props.token);
if (props.devServer) {
    setBaseUrl("https://api-dev.rentinhand.ru/v2");
    setMedia("");
} else {
    setBaseUrl("https://api.rentinhand.ru/v2");
    setMedia("");
}
initGeneralPropsStore(props);
initFilterPropsStore(props);
initBookingPropsStore(props);

const router = useRouterStore();
const { current } = storeToRefs(router);

const clientStore = useClientStore();
const { setClient, setAuthModal } = clientStore;

const { authorization, routeAfterPay, showModalAfterPay } = generalProps;
if (authorization && localStorage.getItem("client")) {
    setClient(JSON.parse(localStorage.getItem("client")));
}

const rentStore = useRentStore();

const modalAuth = ref(null);
const modalSuccess = ref(null);

onMounted(async () => {
    setAuthModal(modalAuth.value);
    initColorsPropsStore(props);

    let url = new URL(window.location.href);
    let hash = url.searchParams.get("SignatureValue");
    if (hash !== null && hash !== undefined) {
        if (showModalAfterPay) {
            modalSuccess.value.show();
        }
        window.history.pushState({}, document.title, window.location.pathname);

        if (routeAfterPay) {
            router.changeRoute(routeAfterPay);
        }
    }

    const settings = await getSettings();
    rentStore.setMinRent(settings?.min_rent_time ?? "PT2H");
    setCurrencyIcon(settings?.currency?.const);
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
        <ModalSuccess ref="modalSuccess" />
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
