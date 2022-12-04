<script setup>
import CartComponent from "@/components/CartComponent/CartComponent.vue";
import { useCartStore } from "@stores";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
</script>

<template>
    <div class="cart-page container">
        <main class="cart-page__main">
            <CartComponent
                class="cart-page__component"
                v-for="(value, key) in cart"
                :inventories="value.inventories"
                :start-date="value.startDate"
                :end-date="value.endDate"
                :key="key"
            />
            <h2 v-if="Object.keys(cart).length === 0" class="cart-page__void">
                Корзина пуста
            </h2>
        </main>
    </div>
</template>
