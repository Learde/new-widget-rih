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

const format = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" : ""}${day}.${
        month < 10 ? "0" : ""
    }${month}.${year}`;
};
</script>

<template>
    <VueDatepicker
        class="datepicker"
        :class="{ 'datepicker--error': hasError }"
        :teleport="teleportElement"
        :format="format"
        v-bind="props"
        v-model="date"
    ></VueDatepicker>
</template>
