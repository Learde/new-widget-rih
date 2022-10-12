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
        <div class="inv-card__info">
            <span class="inv-card__price" v-if="prices">
                от {{ price
                }}<i
                    class="fa-solid fa-ruble-sign"
                    style="font-size: 0.8em"
                ></i>
                /
                {{ humanizeDurationISO(period) }}
            </span>
        </div>
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
import { MEDIA } from "@/stores/urls/urls";
import { getMinimumPriceFromArray } from "@/helpers";
import { humanizeDurationISO } from "@/helpers";

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

const [price, period] = getMinimumPriceFromArray(props.prices);
</script>

<style scoped></style>
