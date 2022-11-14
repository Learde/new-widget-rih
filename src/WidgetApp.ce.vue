<template>
    <div class="rih-widget" id="rih-widget">
        <button @click="goInv">К инвентарю</button>
        <button @click="goLst">К списку</button>

        <component :is="current.component"></component>
    </div>
</template>

<script setup>
import { setToken } from "@/packages/api";
import { pushFontToHead } from "@/helpers";
import { storeToRefs } from "pinia";
import { useRouterStore } from "@/stores";

const props = defineProps({
    token: String,
});

setToken(props.token);

const router = useRouterStore();
const { current } = storeToRefs(router);
const { changeRoute } = router;

const goInv = () => {
    changeRoute("inventoryPage");
};
const goLst = () => {
    changeRoute("inventoryList");
};

// Добавление шрифта Manrope к странице
pushFontToHead();
</script>

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
