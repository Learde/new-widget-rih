<script setup>
import { MEDIA } from "@stores";
import InventoryPrices from "@/components/InventoryPrices/InventoryPrices.vue";

defineProps({
    title: String,
    prices: Array,
    avatar: {
        type: String,
        default: null,
    },
    categoryTitle: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <div class="inventory-info">
        <div class="inventory-info__img-wrapper">
            <img :src="MEDIA + avatar" :alt="title" />
        </div>
        <div class="inventory-info__description">
            <h2 class="inventory-info__heading">
                {{ title }}
            </h2>
            <h5 class="inventory-info__category" v-if="categoryTitle">
                {{ categoryTitle }}
            </h5>
            <p class="inventory-info__desc" v-if="description">
                {{ description }}
            </p>
            <InventoryPrices
                class="inventory-info__price"
                v-if="Array.isArray(prices)"
                :prices="prices"
            />
        </div>
    </div>
</template>
