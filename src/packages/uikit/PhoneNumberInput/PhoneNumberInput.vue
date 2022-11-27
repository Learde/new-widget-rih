<script setup>
import { ref, watch } from "vue";
import importedProps from "./props.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    ...importedProps,
});

const phoneNumber = ref(props.modelValue);
const results = ref(null);

watch(results, () => {
    emit("update:modelValue", results.value.e164);
});
</script>

<template>
    <MazPhoneNumberInput
        class="phone-number-input"
        v-bind="props"
        v-model="phoneNumber"
        @update="results = $event"
        :success="results?.isValid"
    />
</template>
