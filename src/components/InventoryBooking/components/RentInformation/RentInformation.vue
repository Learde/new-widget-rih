<script setup>
import {
    formatDateJs,
    humanizeDurationMillis,
    differenceDatesJs,
} from "@helpers";
defineProps({
    startDate: Date,
    endDate: Date,
    pointTitle: {
        type: String,
        default: null,
    },
    sumRent: {
        type: [String, Number],
        default: null,
    },
});
</script>

<template>
    <div class="rent-range">
        с&nbsp;
        <span class="rent-range__badge rent-range__badge--mr">
            {{ formatDateJs(startDate) }}
        </span>
        по&nbsp;
        <span class="rent-range__badge">{{ formatDateJs(endDate) }}</span>
    </div>
    <div class="rent-range__total">
        <span v-if="pointTitle"> Пункт проката: {{ pointTitle }} </span>
        <span>
            Длительность аренды:
            {{ humanizeDurationMillis(differenceDatesJs(startDate, endDate)) }}
        </span>
        <span> Итого: {{ sumRent }} руб. </span>
    </div>
</template>
