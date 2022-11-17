<script setup>
// Source: https://vue-select.org/
import VueSelect from "vue-select";
import importedProps from "./props.js";

defineEmits(["update:modelValue"]);

const props = defineProps({ ...importedProps });
</script>

<template>
    <vue-select
        v-bind="props"
        @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
    >
        <template #open-indicator> &#160; </template>
        <template #option="option">
            <slot name="option" :option="option">
                {{ option.title }}
            </slot>
        </template>
        <template #selected-option="option">
            <slot name="selected-option" :option="option">
                {{ option.title }}
            </slot>
        </template>
    </vue-select>
</template>
