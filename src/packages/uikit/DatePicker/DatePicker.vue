<template>
    <VueDatepicker
        :model-value="modelValue"
        @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
    ></VueDatepicker>
</template>

<script setup>
import VueDatepicker from "@vuepic/vue-datepicker";
defineProps({
    modelValue: [String, Date, Array, Object, Number],
});
</script>

<style lang="scss" scoped>
@import "@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";
</style>
