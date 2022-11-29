import InventoryList from "@views/InventoryList/InventoryList.vue";
import InventoryPage from "@views/InventoryPage/InventoryPage.vue";
import CartPage from "@views/CartPage/CartPage.vue";

export default {
    INVENTORY_LIST: {
        component: InventoryList,
        name: "inventoryList",
    },
    INVENTORY_PAGE: {
        component: InventoryPage,
        name: "inventoryPage",
    },
    CART_PAGE: {
        component: CartPage,
        name: "cartPage",
    },
};
