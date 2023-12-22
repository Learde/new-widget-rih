<script setup>
import { ref, watch } from "vue";
import importedProps from "./props.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { useTrans } from "@packages/lang";

const { lang } = useTrans();

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    ...importedProps,
});

const phoneNumber = ref(props.modelValue);
const results = ref(null);

const translations = {
    en: {
        phoneNumberLabel: "Phone number *",
        countrySelector: {
            placeholder: "Country code",
            error: "Choose country",
            searchPlaceholder: "Search a country",
        },
        phoneInput: {
            placeholder: "Phone number *",
            example: "Example:",
        },
    },
    ru: {
        phoneNumberLabel: "Телефон *",
        countrySelector: {
            placeholder: "Код страны",
            error: "Выберите код страны",
            searchPlaceholder: "Поиск страны",
        },
        phoneInput: {
            placeholder: "Телефон *",
            example: "Пример:",
        },
    },
};

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
    :translations="translations[lang]"
    />
</template>
