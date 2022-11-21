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
    <div class="rih-booking__range rih-range">
        с&nbsp;
        <span
            class="rih-range__badge rih-range__badge--mr"
            style="margin-bottom: 5px"
        >
            {{ formatDateJs(startDate) }}
        </span>
        по&nbsp;
        <span class="rih-range__badge">{{ formatDateJs(endDate) }}</span>
    </div>
    <div class="rih-booking__total">
        <span v-if="pointTitle"> Пункт проката: {{ pointTitle }} </span>
        <span>
            Длительность аренды:
            {{ humanizeDurationMillis(differenceDatesJs(startDate, endDate)) }}
        </span>
        <span> Итого: {{ sumRent }} руб. </span>
    </div>
</template>
