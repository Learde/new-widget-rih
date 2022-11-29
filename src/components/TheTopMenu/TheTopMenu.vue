<script setup>
import { BaseButton } from "@uikit";
import { IconArrowLeftLong } from "@icons";
import { useClientStore, useRouterStore, generalProps } from "@stores";
import { storeToRefs } from "pinia";

defineEmits(["open-auth"]);

const router = useRouterStore();
const { current } = storeToRefs(router);
const { rollbackRoute, changeRoute } = router;

const clientStore = useClientStore();
const { isAuth } = storeToRefs(clientStore);
const { setClient } = clientStore;

const { authorization } = generalProps;

const doLogout = () => {
    if (localStorage.getItem("client")) {
        localStorage.removeItem("client");
    }
    setClient(null);
    rollbackRoute();
};
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
        <template v-if="authorization">
            <BaseButton
                v-if="!isAuth"
                class="top-menu__auth-btn"
                @click="$emit('open-auth')"
            >
                Войти
            </BaseButton>
            <template v-else>
                <BaseButton
                    v-if="current.name !== 'personalProfile'"
                    class="top-menu__auth-btn"
                    long
                    @click="changeRoute('personalProfile')"
                >
                    Личный кабинет
                </BaseButton>
                <BaseButton v-else class="top-menu__auth-btn" @click="doLogout">
                    Выйти
                </BaseButton>
            </template>
        </template>
    </div>
</template>
