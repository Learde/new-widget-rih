<script setup>
import { computed } from "vue";
import { HeaderFormGroup, DatePicker } from "@uikit";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
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
    <HeaderFormGroup>
        <template #labelText> <slot /> </template>
        <template #input>
            <DatePicker v-model="date" />
        </template>
    </HeaderFormGroup>
</template>
