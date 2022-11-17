<template>
    <vue-select
        v-bind="props"
        @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
    >
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

<script setup>
// Source: https://vue-select.org/
import VueSelect from "vue-select";
import importedProps from "./config";

defineEmits(["update:modelValue"]);

const props = defineProps({ ...importedProps });
</script>
