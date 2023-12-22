<script setup>
import { BaseLoading, BaseButton } from "@uikit";
import { MEDIA, generalProps, bookingProps, currencyIcon } from "@stores";
import { stringEscape } from "@helpers";
import { useTrans } from "@packages/lang";

const { trans } = useTrans();

defineEmits(["open-modal", "add"]);

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
    loading: {
        type: Boolean,
        default: false,
    },
    noShadow: {
        type: Boolean,
        default: false,
    },
    noPrice: {
        type: Boolean,
        default: false,
    },
    noMediaQueries: {
        type: Boolean,
        default: false,
    },
    titleLength: {
        type: Number,
        default: 20,
    },
    categoryTitleLength: {
        type: Number,
        default: 20,
    },
    leftAlign: {
        type: Boolean,
        default: false,
    },
    disableBooking: {
        type: Boolean,
        default: false,
    },
});

const { cart } = generalProps;
const { paymentCoefficient } = bookingProps;
</script>

<template>
    <div
        class="booking-badge"
        :class="{
            'booking-badge--no-shadow': noShadow,
            'booking-badge--left-align': leftAlign,
            'booking-badge--no-media-queries': noMediaQueries,
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
        <span v-if="!noPrice" class="booking-badge__total">
            <template v-if="!paymentCoefficient || +paymentCoefficient === 1">
                {{ trans["to_pay"] }}: {{ sumRent }}
                <component :is="currencyIcon" class="inv-card__icon" />
            </template>
            <template v-else>
                {{ trans["prepayment"] }} {{ paymentCoefficient * 100 }}%:
                {{ sumRent * paymentCoefficient }}
                <component :is="currencyIcon" class="inv-card__icon" />
            </template>
        </span>
        <slot name="button">
            <BaseButton
                v-if="cart"
                @click="$emit('add')"
                :disabled="disableBooking"
            >
                {{ trans["to_cart"] }}
            </BaseButton>
            <BaseButton
                v-else
                @click="$emit('open-modal')"
                :disabled="disableBooking"
            >
                {{ trans["book"] }}
            </BaseButton>
        </slot>
        <BaseLoading v-if="loading" background little></BaseLoading>
    </div>
</template>
