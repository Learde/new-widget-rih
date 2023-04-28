<script setup>
// Source: https://vue-select.org/
import VueSelect from "vue-select";
import importedProps from "./props.js";
import { stringEscape } from "@helpers";
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({ ...importedProps });

const values = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
const stringLength = 20;
</script>

<template>
    <vue-select
        v-bind="props"
        v-model="values"
        :class="{ 'vs--error': hasError }"
    >
        <template #open-indicator> &#160; </template>
        <template #option="option">
            <slot name="option" :option="option">
                {{ option.title }}
            </slot>
        </template>
        <template #selected-option="option">
            <slot name="selected-option" :option="option">
                {{ stringEscape(option.title, stringLength) }}
            </slot>
        </template>
    </vue-select>
</template>
