<script setup>
import { BaseButton } from "@uikit";
import { IconArrowLeftLong } from "@icons";
import { useClientStore, useRouterStore, generalProps } from "@stores";
import { storeToRefs } from "pinia";
import { useTrans } from "@packages/lang";

defineEmits(["open-auth"]);

const { trans } = useTrans();

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
            <IconArrowLeftLong /> {{ trans["back"] }}
        </BaseButton>
        <template v-if="authorization">
            <BaseButton
                v-if="!isAuth"
                class="top-menu__auth-btn"
                @click="$emit('open-auth')"
            >
                {{ trans["sign_in"] }}
            </BaseButton>
            <template v-else>
                <BaseButton
                    v-if="current.name !== 'personalProfile'"
                    class="top-menu__auth-btn"
                    long
                    @click="changeRoute('personalProfile')"
                >
                    {{ trans["personal_profile"] }}
                </BaseButton>
                <BaseButton v-else class="top-menu__auth-btn" @click="doLogout">
                    {{ trans["sign_out"] }}
                </BaseButton>
            </template>
        </template>
    </div>
</template>
