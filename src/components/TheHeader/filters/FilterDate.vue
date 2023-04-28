<script setup>
import { computed } from "vue";
import { HeaderFormGroup, DatePicker } from "@uikit";
import { filterProps } from "@stores";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
    type: String,
});

const date = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const { requiredFilters } = filterProps;
const hasError = computed(() => {
    return requiredFilters.includes(props.type) && !date.value;
});
</script>

<template>
    <HeaderFormGroup>
        <template #labelText> <slot /> </template>
        <template #input>
            <DatePicker v-model="date" :has-error="hasError" />
        </template>
    </HeaderFormGroup>
</template>
