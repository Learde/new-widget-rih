import { defineStore } from "pinia";
import { ref } from "vue";

export const useClientStore = defineStore("client", () => {
    const client = ref({});
    const isAuth = ref(false);
    const authModal = ref(null);

    function setAuthModal(modal) {
        this.authModal = modal;
    }

    function setClient(client) {
        this.client = client;
        this.isAuth = client !== null;
    }

    function setOnlyClient(client) {
        this.client = client;
    }

    return {
        client,
        isAuth,
        authModal,
        setClient,
        setOnlyClient,
        setAuthModal,
    };
});
