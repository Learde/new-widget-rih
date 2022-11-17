<script setup>
import { onMounted, ref } from "vue";
import VueDatepicker from "@vuepic/vue-datepicker";
import importedProps from "./props.js";

defineEmits(["update:modelValue"]);

const props = defineProps({
    ...importedProps,
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
        @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
    ></VueDatepicker>
</template>
