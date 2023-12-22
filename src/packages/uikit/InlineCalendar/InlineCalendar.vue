<script setup>
// Source: https://vue3datepicker.com
import { computed } from "vue";
import VueDatepicker from "@vuepic/vue-datepicker";
import importedProps from "./props.js";
import { useTrans } from "@packages/lang";

const { lang } = useTrans();

const emit = defineEmits(["update:modelValue", "update-month-year"]);

const props = defineProps({
    ...importedProps,
});

const date = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <VueDatepicker
        class="inline-calendar"
        v-bind="props"
        v-model="date"
        :locale="lang"
        @update-month-year="(param) => emit('update-month-year', param)"
    ></VueDatepicker>
</template>
