<script setup>
// Source: https://vue3datepicker.com
import { computed, onMounted, ref } from "vue";
import VueDatepicker from "@vuepic/vue-datepicker";
import importedProps from "./props.js";

const emit = defineEmits(["update:modelValue"]);

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
    ></VueDatepicker>
</template>
