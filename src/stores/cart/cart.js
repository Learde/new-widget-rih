import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
    const delim = "___";

    const cart = ref({});

    function getKey(startDateMillis, endDateMillis) {
        const startDateMillisSubM = new Date(startDateMillis);
        startDateMillisSubM.setSeconds(0);
        const endDateMillisSubM = new Date(endDateMillis);
        endDateMillisSubM.setSeconds(0);

        return (
            startDateMillisSubM.toString() +
            delim +
            endDateMillisSubM.toString()
        );
    }

    function addInventory(inventory, startDateMillis, endDateMillis) {
        const key = getKey(startDateMillis, endDateMillis);
        const inventoryCopy = JSON.parse(JSON.stringify(inventory));
        if (Object.keys(this.cart).includes(key)) {
            this.cart[key].inventories.push(inventoryCopy);
            return;
        }

        this.cart[key] = {
            startDate: new Date(key.split(delim)[0]),
            endDate: new Date(key.split(delim)[1]),
            inventories: [inventoryCopy],
        };
    }

    function removeInventory(inventory, startDateMillis, endDateMillis) {
        const key = getKey(startDateMillis, endDateMillis);
        if (Object.keys(this.cart).includes(key)) {
            this.cart[key].inventories = this.cart[key].inventories.filter(
                (inv) => +inv.id !== +inventory.id
            );
            if (this.cart[key].inventories.length === 0) delete this.cart[key];
        }
    }

    function includesInventory(inventory, startDateMillis, endDateMillis) {
        const key = getKey(startDateMillis, endDateMillis);
        if (Object.keys(this.cart).includes(key)) {
            return (
                this.cart[key].inventories.find(
                    (inv) => +inv.id === +inventory.id
                ) !== undefined
            );
        }
        return false;
    }

    return { cart, addInventory, removeInventory, includesInventory };
});
