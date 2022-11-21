<script setup>
import { BaseLoading, BaseButton } from "@uikit";
import { MEDIA } from "@stores";
import { stringEscape } from "@helpers";

const props = defineProps({
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
});

const titleLength = 20;
const categoryTitleLength = 20;
</script>

<template>
    <div class="rih-booking__form rih-booking-form">
        <div class="rih-booking-form__inventory">
            <img
                class="rih-booking-form__img"
                :src="MEDIA + avatar"
                :alt="title"
            />
            <div class="rih-booking-form__info">
                <span class="rih-booking-form__title">
                    {{ stringEscape(title, titleLength) }}
                </span>
                <span v-if="categoryTitle" class="rih-booking-form__category">
                    {{ stringEscape(categoryTitle, categoryTitleLength) }}
                </span>
            </div>
        </div>
        <span class="rih-booking-form__total">
            К оплате: {{ sumRent }} руб.
        </span>
        <BaseButton
            v-if="needCart"
            class="rih-button rih-button--long"
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
            class="rih-button rih-button--long"
            @click="bookInventory"
            :disabled="timeEnd === null || timeStart === null || disableBooking"
        >
            Забронировать
        </BaseButton>
        <BaseLoading
            v-if="calculating || booking"
            background
            little
        ></BaseLoading>
    </div>
</template>
