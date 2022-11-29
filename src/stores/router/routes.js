import InventoryList from "@views/InventoryList/InventoryList.vue";
import InventoryPage from "@views/InventoryPage/InventoryPage.vue";
import CartPage from "@views/CartPage/CartPage.vue";
import PersonalProfile from "@views/PersonalProfile/PersonalProfile.vue";

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
    PERSONAL_PROFILE: {
        component: PersonalProfile,
        name: "personalProfile",
    },
};
