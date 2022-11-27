<script setup>
import { BaseLoading, BaseButton } from "@uikit";
import { MEDIA } from "@stores";
import { stringEscape } from "@helpers";

defineEmits(["open-modal"]);

defineProps({
    avatar: String,
    title: String,
    categoryTitle: {
        type: String,
        default: null,
    },
    sumRent: {
        type: [Number, String],
        default: null,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    noShadow: {
        type: Boolean,
        default: false,
    },
    leftAlign: {
        type: Boolean,
        default: false,
    },
});

const titleLength = 20;
const categoryTitleLength = 20;
</script>

<template>
    <div
        class="booking-badge"
        :class="{
            'booking-badge--no-shadow': noShadow,
            'booking-badge--left-align': leftAlign,
        }"
    >
        <div class="booking-badge__inventory">
            <img
                class="booking-badge__img"
                :src="MEDIA + avatar"
                :alt="title"
            />
            <div class="booking-badge__info">
                <span class="booking-badge__title">
                    {{ stringEscape(title, titleLength) }}
                </span>
                <span v-if="categoryTitle" class="booking-badge__category">
                    {{ stringEscape(categoryTitle, categoryTitleLength) }}
                </span>
            </div>
        </div>
        <span class="booking-badge__total"> К оплате: {{ sumRent }} руб. </span>
        <slot name="button">
            <BaseButton
                v-if="needCart"
                :disabled="
                    timeEnd === null ||
                    timeStart === null ||
                    isBooked ||
                    disableBooking
                "
                @click="addInCart()"
            >
                В корзину
            </BaseButton>
            <BaseButton
                v-else
                @click="$emit('open-modal')"
                :disabled="
                    timeEnd === null || timeStart === null || disableBooking
                "
            >
                Забронировать
            </BaseButton>
        </slot>
        <BaseLoading v-if="loading" background little></BaseLoading>
    </div>
</template>
