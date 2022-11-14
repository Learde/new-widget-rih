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
import VueSelect from "vue-select";
import props from "./config";

defineEmits(["update:modelValue"]);

defineProps(props);
</script>
