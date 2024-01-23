import { defineStore } from "pinia";
import { isNil } from "lodash";
import { ref, computed } from "vue";

import { authClient, registerClient } from "@packages/api";

export const useClientStore = defineStore("client", () => {
    const client = ref(null);
    const authModal = ref(null);
    const isLoading = ref(false);

    const isAuth = computed(() => {
        return !isNil(client.value);
    });

    function setAuthModal(modal) {
        authModal.value = modal;
    }

    function setClient(c) {
        client.value = c;
    }

    function setOnlyClient(c) {
        client.value = c;
    }

    async function tryAuth(data) {
        try {
            isLoading.value = true;
            client.value = await authClient(data);
        } catch (e) {
            console.log(e);
        } finally {
            isLoading.value = false;
        }
    }

    async function register(data) {
        try {
            isLoading.value = true;

            client.value = await registerClient(data);
        } catch (e) {
            console.log(e);
        } finally {
            isLoading.value = true;
        }
    }

    return {
        client,
        isAuth,
        authModal,
        isLoading,

        setOnlyClient,
        setAuthModal,

        setClient,
        tryAuth,
        register,
    };
});
