import { defineStore } from "pinia";
import { ref } from "vue";

export const useClientStore = defineStore("client", () => {
    const client = ref({});
    const isAuth = ref(false);

    function setClient(client) {
        this.client = client;
        this.isAuth = true;
    }

    function setOnlyClient(client) {
        this.client = client;
    }

    return { client, isAuth, setClient, setOnlyClient };
});
