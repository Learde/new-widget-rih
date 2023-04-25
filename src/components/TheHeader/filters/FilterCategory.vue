<script setup>
import { computed, onMounted, ref } from "vue";
import { HeaderFormGroup, TreeSelect } from "@uikit";
import { getCategories } from "@api";
import { generalProps } from "@stores";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: Object,
});

const { hiddenCategories } = generalProps;

const categories = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

const categoriesOptions = ref([]);

onMounted(async () => {
    const categoriesFromServer = (await getCategories()).data?.array;
    if (
        Array.isArray(hiddenCategories) &&
        hiddenCategories.length > 0 &&
        Array.isArray(categoriesFromServer)
    )
        categoriesOptions.value = categoriesFromServer.filter(
            (category) => !hiddenCategories.includes(String(category.id))
        );
    else categoriesOptions.value = categoriesFromServer;
});
</script>

<template>
    <HeaderFormGroup>
        <template #labelText> Категория </template>
        <template #input>
            <TreeSelect v-model="categories" :options="categoriesOptions" />
        </template>
    </HeaderFormGroup>
</template>
