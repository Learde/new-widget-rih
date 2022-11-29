<script setup>
import { computed } from "vue";
import { useCartStore, generalProps, useRouterStore } from "@stores";
import { IconBagShopping } from "@icons";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const router = useRouterStore();
const { changeRoute } = router;
const { current } = storeToRefs(router);

const countInventories = computed(() => {
    let count = 0;
    Object.keys(cart.value).forEach((key) => {
        count += cart.value[key].inventories.length;
    });
    return count;
});
</script>

<template>
    <div
        class="cart-fixed"
        v-if="
            generalProps.cart &&
            current.name !== 'cartPage' &&
            countInventories > 0
        "
        @click="changeRoute('cartPage')"
    >
        <IconBagShopping />
        <span
            class="cart-fixed__count"
            :class="{ 'cart-fixed__count--smaller': countInventories > 99 }"
        >
            <template v-if="countInventories > 99"> 99+ </template>
            <template v-else>
                {{ countInventories }}
            </template>
        </span>
    </div>
</template>
