import { defineStore } from "pinia";
import { shallowRef } from "vue";
import routes from "./routes";

export const useRouterStore = defineStore("router", () => {
    const current = shallowRef(routes.INVENTORY_LIST);

    /**
     * Change active component by name
     * @param name - name of the route (@/stores/router/routes.js)
     */
    function changeRoute(name) {
        const route = Object.values(routes).find(
            (value) => value.name === name
        );
        if (route) this.current = route;
    }

    return { current, changeRoute };
});
