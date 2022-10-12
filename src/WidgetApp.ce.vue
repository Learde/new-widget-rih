<template>
    <div class="rih-widget" id="rih-widget">
        <button @click="goInv">К инвентарю</button>
        <button @click="goLst">К списку</button>

        <component :is="current.component"></component>
    </div>
</template>

<script setup>
import { setToken } from "@/api";
import { defineProps } from "vue";
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
</script>

<style lang="scss">
@import "assets/main";

.rih-widget {
    width: 100%;
    padding: 30px 50px;
}
</style>
