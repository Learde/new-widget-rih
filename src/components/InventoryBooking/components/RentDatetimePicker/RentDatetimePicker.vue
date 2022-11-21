<script setup>
import { InlineCalendar } from "@uikit";
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
});

const datetime = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <div class="rent-datetime">
        <!--                    <InlineCalendar-->
        <!--                        :key="pickerKey"-->
        <!--                        ref="picker"-->
        <!--                        opens="inline"-->
        <!--                        :ranges="false"-->
        <!--                        auto-apply-->
        <!--                        single-date-picker="range"-->
        <!--                        v-model="range"-->
        <!--                        :locale-data="rangeLocale"-->
        <!--                        :date-format="dateFormat"-->
        <!--                        :min-date="minDate"-->
        <!--                        @update="changeRange"-->
        <!--                        @change-month="loadBooking"-->
        <!--                    />-->
        <InlineCalendar v-model="datetime" />
    </div>
</template>
