<script setup>
import { computed } from "vue";
import { formatDateJs, intervalToDuration, formatDurationRu } from "@helpers";
const props = defineProps({
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

const durationRent = computed(() => {
    return intervalToDuration({
        start: props.startDate,
        end: props.endDate,
    });
});

const humanizedDuration = computed(() => {
    return formatDurationRu(durationRent.value);
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
            {{ humanizedDuration }}
        </span>
        <span> Итого: {{ sumRent }} руб. </span>
    </div>
</template>
