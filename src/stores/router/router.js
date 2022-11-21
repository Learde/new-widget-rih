import { defineStore } from "pinia";
import { shallowRef } from "vue";
import routes from "./routes";

export const useRouterStore = defineStore("router", () => {
    const current = shallowRef(routes.INVENTORY_LIST);

    /**
     * Change active component by name
     * @param name - name of the route (@/stores/router/routes.js)
     * @param params - additional params for route
     */
    function changeRoute(name, params = null) {
        const route = Object.values(routes).find(
            (value) => value.name === name
        );

        // Add parameters to route
        if (params !== null) route.params = params;
        else if (route.params) delete route.params;

        if (route) this.current = route;
    }

    return { current, changeRoute };
});
