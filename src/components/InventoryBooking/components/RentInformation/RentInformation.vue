<script setup>
import { computed } from "vue";
import { formatDateJs, intervalToDuration, formatDurationRu } from "@helpers";
import { currencyIcon } from "@stores";
import { useTrans } from "@packages/lang";

const { trans, lang } = useTrans();
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
    return formatDurationRu(durationRent.value, {}, lang.value);
});
</script>

<template>
    <div class="rent-range">
        {{ trans["with"] }}&nbsp;
        <span class="rent-range__badge rent-range__badge--mr">
            {{ formatDateJs(startDate) }}
        </span>
        {{ trans["to"] }}&nbsp;
        <span class="rent-range__badge">{{ formatDateJs(endDate) }}</span>
    </div>
    <div class="rent-range__total">
        <span v-if="pointTitle">
            {{ trans["point_label"] }}: {{ pointTitle }}
        </span>
        <span>
            {{ trans["rent_duration"] }}:
            {{ humanizedDuration }}
        </span>
        <span>
            {{ trans["total"] }}: {{ sumRent }}
            <component :is="currencyIcon" class="inv-card__icon" />
        </span>
    </div>
</template>
