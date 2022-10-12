<template>
    <article class="inv-card">
        <span v-if="category" class="inv-card__category">
            {{ category }}
        </span>
        <div
            class="inv-card__image"
            :style="{
                'background-image': `url('${MEDIA + image}')`,
            }"
            @click="$emit('pick', id, false)"
        ></div>
        <h3 class="inv-card__heading">{{ title }}</h3>
        <!--        <div class="inv-card__info">-->
        <!--            <span class="inv-card__price" v-if="prices">-->
        <!--                от {{ getMinimumPrice(prices)-->
        <!--                }}<i-->
        <!--                    class="fa-solid fa-ruble-sign"-->
        <!--                    style="font-size: 0.8em"-->
        <!--                ></i>-->
        <!--                /-->
        <!--                {{ getMinimumPricePeriod(prices) }}-->
        <!--            </span>-->
        <!--        </div>-->
        <div class="inv-card__more" @click="$emit('pick', id, false)">
            <span class="inv-card__more-text">Подробнее</span>
            <i class="fa-solid fa-angle-right"></i>
        </div>
        <div class="inv-card__book" @click="$emit('pick', id, true)">
            <span class="inv-card__book-text">Забронировать</span>
            <i class="fa-solid fa-angle-right"></i>
        </div>
    </article>
</template>

<script setup>
import { defineProps } from "vue";
import { MEDIA } from "@/stores/urls/urls";

const props = defineProps({
    id: [String, Number],
    title: String,
    category: {
        type: String,
        default: "",
    },
    prices: Array,
    image: String,
});

const getMinimumPrice = (prices) => {
    let min = -1;
    if (!Array.isArray(prices)) return min;
    prices.forEach((price) => {
        if (min > price.values.slice().reverse()[0].value || min === -1)
            min = price.values.slice().reverse()[0].value;
    });
    return min;
};
const getMinimumPricePeriod = (prices) => {
    let min = -1;
    let period = "";
    if (!Array.isArray(prices)) return period;
    prices.forEach((price) => {
        if (min > price.values.slice().reverse()[0].value || min === -1) {
            min = price.values.slice().reverse()[0].value;
            period = price.values.slice().reverse()[0].period;
        }
    });
    return period;
};
</script>

<style scoped></style>
