<template>
    <article class="inv-card">
        <span v-if="category" class="inv-card__category">
            {{ category }}
        </span>
        <div
            class="inv-card__image"
            :style="{
                'background-image': `url('${MEDIA + image}')`,
                'background-size': imageSize,
            }"
            @click="$emit('pick', id, false)"
        ></div>
        <h3 class="inv-card__heading">{{ title }}</h3>
        <div class="inv-card__info">
            <span class="inv-card__price" v-if="prices">
                от {{ price
                }}<icon-ruble-sign
                    class="inv-card__icon"
                    color="#a7a7a7"
                    width="0.9em"
                    height="0.9em"
                />
                /
                {{ humanizeDurationISO(period) }}
            </span>
        </div>
        <div class="inv-card__more" @click="$emit('pick', id, false)">
            <span class="inv-card__more-text">Подробнее</span>
            <icon-angle-right width="10" height="16" color="#666" />
        </div>
        <div class="inv-card__book" @click="$emit('pick', id, true)">
            <span class="inv-card__book-text">Забронировать</span>
            <icon-angle-right
                width="10"
                height="16"
                color="var(--widget-primary)"
            />
        </div>
    </article>
</template>

<script setup>
import { MEDIA, imageSize } from "@/stores";
import { getMinimumPriceFromArray, humanizeDurationISO } from "@/helpers";
import IconRubleSign from "@/icons/IconRubleSign.vue";
import IconAngleRight from "@/icons/IconAngleRight.vue";

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
