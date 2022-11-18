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

const teleportElement = ref(null);
onMounted(() => {
    // TODO: поменять rih-widget на нестатическое значение, чтобы случайно не поломался календарь
    teleportElement.value = document
        .getElementById("rih-widget")
        .shadowRoot.getElementById("rih-widget");
});
</script>

<template>
    <VueDatepicker
        class="datepicker"
        :teleport="teleportElement"
        v-bind="props"
        v-model="date"
    ></VueDatepicker>
</template>
