<script setup>
import { formatDurationRu, formatDistanceRu, parseISODuration } from "@helpers";
import { currencyIcon } from "@stores";
import { useTrans } from "@packages/lang";

const { trans, lang } = useTrans();
defineProps({
    prices: Array,
});

const humanizeDuration = (duration) => {
    if (!duration) return null;

    return formatDurationRu(parseISODuration(duration), {}, lang.value);
};

const humanizeDistance = (duration) => {
    if (!duration) return null;

    return formatDistanceRu(parseISODuration(duration), {}, lang.value);
};
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
            {{ trans["prices"] }}
            <template v-if="prices.length > 1">
                ({{ trans["tariff"] }} &#171;{{ price.title }}&#187;)
            </template>
        </h5>
        <ul class="inventory-price__list">
            <li
                v-for="(valuePrice, index) in price.values"
                class="inventory-price__item"
                :key="index"
            >
                {{ humanizeDuration(valuePrice.period) }} -
                {{ valuePrice.value }}
                <component :is="currencyIcon" class="inv-card__icon" />
                <template v-if="valuePrice.more_then !== 'PT0S'">
                    ({{ trans["from"] }}
                    {{ humanizeDistance(valuePrice.more_then) }})
                </template>
            </li>
        </ul>
    </div>
</template>
