<script setup>
import { humanizeDurationISO } from "@helpers";
import { currencyIcon } from "@stores";
defineProps({
    prices: Array,
});
</script>

<template>
    <div
        class="inventory-price"
        v-for="(price, index) in prices"
        :key="index"
        :class="{
            'inventory-price--mb': index + 1 < prices.length,
        }"
    >
        <h5 class="inventory-price__heading">
            Расценки
            <template v-if="prices.length > 1">
                (Тариф &#171;{{ price.title }}&#187;)
            </template>
        </h5>
        <ul class="inventory-price__list">
            <li
                v-for="(valuePrice, index) in price.values"
                class="inventory-price__item"
                :key="index"
            >
                {{ humanizeDurationISO(valuePrice.period) }} -
                {{ valuePrice.value }}
                <component :is="currencyIcon" class="inv-card__icon" />
            </li>
        </ul>
    </div>
</template>
