<script setup>
import { BaseButton } from "@uikit";
import { IconArrowLeftLong } from "@icons";
import { useRouterStore } from "@stores";
import { storeToRefs } from "pinia";

const router = useRouterStore();
const { current } = storeToRefs(router);
const { rollbackRoute } = router;
</script>

<template>
    <div
        class="top-menu"
        v-if="current.name !== 'inventoryList'"
        :class="{ 'top-menu--bg': current.name !== 'inventoryPage' }"
    >
        <BaseButton class="top-menu__back-btn" @click="rollbackRoute">
            <IconArrowLeftLong /> Назад
        </BaseButton>
    </div>
</template>
