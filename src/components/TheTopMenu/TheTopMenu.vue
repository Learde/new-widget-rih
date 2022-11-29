<script setup>
import { BaseButton } from "@uikit";
import { IconArrowLeftLong } from "@icons";
import { useRouterStore } from "@stores";
import { storeToRefs } from "pinia";

defineEmits(["open-auth"]);

const router = useRouterStore();
const { current } = storeToRefs(router);
const { rollbackRoute } = router;
</script>

<template>
    <div
        class="top-menu"
        :class="{ 'top-menu--bg': current.name !== 'inventoryPage' }"
    >
        <BaseButton
            v-if="current.name !== 'inventoryList'"
            class="top-menu__back-btn"
            @click="rollbackRoute"
        >
            <IconArrowLeftLong /> Назад
        </BaseButton>
        <BaseButton class="top-menu__auth-btn" @click="$emit('open-auth')">
            Войти
        </BaseButton>
    </div>
</template>
